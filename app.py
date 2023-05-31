from flask import Flask, render_template, request, jsonify
import openai


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

openai.api_key = '<YOUR-API-KEY>'

@app.route('/get-response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ],
        temperature=0.7,
        max_tokens=50,
    )

    bot_response = response['choices'][0]['message']['content'].strip()
    
    return jsonify({'response': bot_response})
    
    return jsonify({'response': bot_response})


if __name__ == '__main__':
    app.run()
