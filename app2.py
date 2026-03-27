from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Krishi AI Guardian Backend Running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    return jsonify({"result": "Sample Prediction"})

if __name__ == '__main__':
    app.run(debug=True)