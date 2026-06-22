from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import deque
import time
import os

app = Flask(__name__)
CORS(app)

HISTORY_LEN = 200
history = deque(maxlen=HISTORY_LEN)
latest = {}

@app.route("/data", methods=["POST"])
def receive_data():
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "no json"}), 400

    payload["timestamp"] = time.time()
    latest.update(payload)
    history.append(payload)

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
