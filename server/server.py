from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import deque
import time
import os
import numpy as np

app = Flask(__name__)
CORS(app)

HISTORY_LEN = 200
history = deque(maxlen=HISTORY_LEN)
latest = {}

session_start = time.time()

efield_state = {"peak": 0, "values": deque(maxlen=500), "cumulative": 0, "last_t": None}
hall_state = {"peak": 0, "values": deque(maxlen=500)}
rf_state = {"peak_occ": 0, "occ_values": deque(maxlen=500)}
power_state = {"peak_dbm": -999, "values": deque(maxlen=500)}

EFIELD_CAL = 0.05          # V/m per ADC-count-RMS, placeholder, calibrate later
EFIELD_REF_LIMIT = 100.0   # V/m, project-defined reference
HALL_SENSITIVITY_MV_PER_MT = 1.25
HALL_REF_LIMIT_MT = 10.0
SAMPLE_RATE_DEFAULT_US = 200
RF_SWEEPS = 8
RF_BUSY_THRESHOLD = 0.3
RF_POWER_REF_WM2 = 0.15
AD_ANTENNA_GAIN_FACTOR = 1.0  # placeholder, refine with real antenna gain


def dominant_frequency(samples, sample_period_s):
    x = np.array(samples, dtype=float)
    x = x - np.mean(x)
    n = len(x)
    if n < 4:
        return 0.0
    fft_vals = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(n, d=sample_period_s)
    mag = np.abs(fft_vals)
    if len(mag) > 1:
        mag[0] = 0  # remove DC
    idx = int(np.argmax(mag))
    return float(freqs[idx])


def rms(samples):
    x = np.array(samples, dtype=float)
    return float(np.sqrt(np.mean((x - np.mean(x)) ** 2)))


def polarity_reversal_rate(samples, sample_period_s):
    x = np.array(samples, dtype=float)
    x = x - np.mean(x)
    signs = np.sign(x)
    signs[signs == 0] = 1
    reversals = np.sum(signs[1:] != signs[:-1])
    duration = len(x) * sample_period_s
    if duration <= 0:
        return 0.0
    return float(reversals / duration)


def classify(ratio):
    if ratio < 30:
        return "Low"
    elif ratio < 70:
        return "Moderate"
    else:
        return "High"


def classify_efield(value):
    if value < 500:
        return "Low"
    elif value < 1500:
        return "Moderate"
    else:
        return "High"


def classify_magnetic(value):
    if value < 145:
        return "Low"
    elif value < 180:
        return "Moderate"
    else:
        return "High"


def process_efield(efield_wave, sample_period_s):
    r = rms(efield_wave)
    field_vm = r * EFIELD_CAL
    efield_state["peak"] = max(efield_state["peak"], field_vm)
    efield_state["values"].append(field_vm)
    avg_vm = float(np.mean(efield_state["values"]))

    now = time.time()
    if efield_state["last_t"] is not None:
        dt = now - efield_state["last_t"]
        efield_state["cumulative"] += field_vm * dt
    efield_state["last_t"] = now

    freq = dominant_frequency(efield_wave, sample_period_s)
    exposure_ratio = (field_vm / EFIELD_REF_LIMIT) * 100

    return {
        "current_vm": round(field_vm, 3),
        "peak_vm": round(efield_state["peak"], 3),
        "avg_vm": round(avg_vm, 3),
        "exposure_ratio": round(exposure_ratio, 1),
        "classification": classify_efield(r),
        "dominant_frequency_hz": round(freq, 1),
        "cumulative_exposure": round(efield_state["cumulative"], 2),
        "raw_wave": efield_wave
    }


def process_hall(hall_wave, hall_baseline, sample_period_s):
    delta = [v - hall_baseline for v in hall_wave]
    volts_per_count = 3.3 / 4095.0
    mt_values = [(d * volts_per_count * 1000.0) / HALL_SENSITIVITY_MV_PER_MT for d in delta]
    current_mt = abs(mt_values[-1]) if mt_values else 0
    hall_state["peak"] = max(hall_state["peak"], current_mt)
    hall_state["values"].append(current_mt)
    avg_mt = float(np.mean(hall_state["values"]))

    freq = dominant_frequency(delta, sample_period_s)
    rev_rate = polarity_reversal_rate(delta, sample_period_s)
    exposure_ratio = (current_mt / HALL_REF_LIMIT_MT) * 100
    last_delta = abs(delta[-1]) if delta else 0

    return {
        "current_mt": round(current_mt, 3),
        "peak_mt": round(hall_state["peak"], 3),
        "avg_mt": round(avg_mt, 3),
        "exposure_ratio": round(exposure_ratio, 1),
        "classification": classify_magnetic(last_delta),
        "dominant_frequency_hz": round(freq, 1),
        "polarity_reversal_rate": round(rev_rate, 1),
        "raw_signed_mt": [round(v, 3) for v in mt_values]
    }


def process_rf(rf_channels):
    max_hits = RF_SWEEPS
    occ_pct = [min(h / max_hits, 1.0) * 100 for h in rf_channels]
    avg_occ = float(np.mean(occ_pct))
    peak_occ = float(np.max(occ_pct))
    busiest_ch = int(np.argmax(occ_pct))
    idle_count = sum(1 for o in occ_pct if o == 0)

    busy_flags = [o > (RF_BUSY_THRESHOLD * 100) for o in occ_pct]
    clusters = 0
    in_cluster = False
    for flag in busy_flags:
        if flag and not in_cluster:
            clusters += 1
            in_cluster = True
        elif not flag:
            in_cluster = False

    hopping_active = clusters >= 3

    rf_state["peak_occ"] = max(rf_state["peak_occ"], peak_occ)
    rf_state["occ_values"].append(avg_occ)
    congestion_index = float(np.mean(rf_state["occ_values"]))

    return {
        "peak_occupancy": round(peak_occ, 1),
        "avg_occupancy": round(avg_occ, 1),
        "band_congestion_index": round(congestion_index, 1),
        "busiest_channel": busiest_ch,
        "busiest_channel_mhz": round(2400 + busiest_ch * 1, 1),
        "device_count_estimate": clusters,
        "hopping_pattern_active": hopping_active,
        "idle_channel_count": idle_count,
        "classification": classify(congestion_index),
        "channel_occupancy": [round(o, 1) for o in occ_pct]
    }


def process_power(dbm, total_hits):
    mw = 10 ** (dbm / 10.0)
    power_density_wm2 = (mw / 1000.0) * AD_ANTENNA_GAIN_FACTOR
    power_density_mwm2 = power_density_wm2 * 1000

    power_state["peak_dbm"] = max(power_state["peak_dbm"], dbm)
    power_state["values"].append(dbm)
    avg_dbm = float(np.mean(power_state["values"]))

    exposure_ratio = (power_density_wm2 / RF_POWER_REF_WM2) * 100
    signal_bar = int(np.clip(np.interp(dbm, [-60, 0], [0, 20]), 0, 20))

    hist, _ = np.histogram(list(power_state["values"]), bins=8)

    return {
        "current_dbm": round(dbm, 2),
        "current_mw": round(mw, 4),
        "power_density_wm2": round(power_density_wm2, 5),
        "power_density_mwm2": round(power_density_mwm2, 2),
        "peak_dbm": round(power_state["peak_dbm"], 2),
        "avg_dbm": round(avg_dbm, 2),
        "exposure_ratio": round(exposure_ratio, 1),
        "classification": classify(exposure_ratio),
        "signal_bar_level": signal_bar,
        "session_histogram": hist.tolist()
    }


@app.route("/data", methods=["POST"])
def receive_data():
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "no json"}), 400

    sample_us = payload.get("sample_rate_us", SAMPLE_RATE_DEFAULT_US)
    sample_period_s = sample_us / 1_000_000.0

    efield_wave = payload.get("efield_wave", [])
    hall_wave = payload.get("hall_wave", [])
    hall_baseline = payload.get("hall_baseline", 2048)
    rf_channels = payload.get("rf_channels", [0] * 125)
    dbm = payload.get("rf_power_dbm", 0)
    total_hits = payload.get("rf_total_hits", 0)

    result = {
        "timestamp": time.time(),
        "electric": process_efield(efield_wave, sample_period_s) if efield_wave else {},
        "magnetic": process_hall(hall_wave, hall_baseline, sample_period_s) if hall_wave else {},
        "rf_scan": process_rf(rf_channels),
        "rf_power": process_power(dbm, total_hits)
    }

    latest.update(result)
    history.append(result)

    return jsonify({"status": "ok"}), 200


@app.route("/latest", methods=["GET"])
def get_latest():
    return jsonify(latest)


@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(list(history))


@app.route("/history/<int:n>", methods=["GET"])
def get_history_n(n):
    return jsonify(list(history)[-n:])


@app.route("/reset", methods=["POST"])
def reset_session():
    global session_start
    session_start = time.time()
    efield_state["peak"] = 0
    efield_state["values"].clear()
    efield_state["cumulative"] = 0
    efield_state["last_t"] = None
    hall_state["peak"] = 0
    hall_state["values"].clear()
    rf_state["peak_occ"] = 0
    rf_state["occ_values"].clear()
    power_state["peak_dbm"] = -999
    power_state["values"].clear()
    return jsonify({"status": "reset"}), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
