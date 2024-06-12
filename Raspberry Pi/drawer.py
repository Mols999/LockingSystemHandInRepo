
import RPi.GPIO as GPIO
import threading
import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

Drawer_PIN = 26
VIBRATION_SENSOR_PIN = 17
LOG_API_URL = 'http://192.168.87.112:3001/api/logs'

GPIO.setmode(GPIO.BCM)
GPIO.setup(Drawer_PIN, GPIO.OUT)
GPIO.setup(VIBRATION_SENSOR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

lockers_status = {
    "A101": "Locked",
}

@app.route('/')
def index():
    return "Connected successfully!"

@app.route('/drawer', methods=['POST'])
def control_drawer():
    action = request.json.get('action')
    locker_number = request.json.get('lockerNumber')
    if locker_number in lockers_status:
        if action == 'on':
            GPIO.output(Drawer_PIN, GPIO.HIGH)
            lockers_status[locker_number] = "Unlocked"
            return jsonify({"message": f"Locker {locker_number} unlocked"})
        elif action == 'off':
            GPIO.output(Drawer_PIN, GPIO.LOW)
            lockers_status[locker_number] = "Locked"
            return jsonify({"message": f"Locker {locker_number} locked"})
        else:
            return jsonify({"message": "Invalid action"}), 400
    else:
        return jsonify({"message": "Invalid locker number"}), 400

def monitor_vibration():
    while True:
        if GPIO.input(VIBRATION_SENSOR_PIN) == GPIO.LOW:
            print("Motion Detected!")
            for locker_number, status in lockers_status.items():
                if status == "Locked":
                    log_tampering(locker_number)
        time.sleep(5)

def log_tampering(locker_number):
    try:
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "event": f"Tampering detected on locker {locker_number}",
            "eventType": "Tampering Detected",
            "message": f"Tampering detected on locker {locker_number}"
        }
        response = requests.post(LOG_API_URL, json=log_entry)
        response.raise_for_status()
        print(f"Log sent successfully: {response.json()}")
    except requests.RequestException as e:
        print(f"Error logging tampering event: {e}")
        if e.response is not None:
            print(f"Response content: {e.response.content}")

if __name__ == '__main__':
    try:
        threading.Thread(target=monitor_vibration, daemon=True).start()
        app.run(host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("Ending the program")
        GPIO.cleanup()
