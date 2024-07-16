#Importing the necessary libraries
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

#Configuring the Gemini API
load_dotenv()
API_KEY = os.getenv('API_KEY')
genai.configure(API_KEY)
model = genai.GenerativeModel('gemini-pro')

#Creating the Flask app
app = Flask(__name__)
CORS(app)

#Initializing conversation history
conversation_history = []

#Function to generate a response
def get_response(query):
    
    full_prompt = '\n'.join(conversation_history + [query])

    #Generating the response
    response = model.generate_content(full_prompt)

    #Update the conversation history
    conversation_history.append(query)
    conversation_history.append(response.text)

    return response.text

#Route to handle the chatbot
@app.route('/', methods=['POST'])
def chat():
    user_input = request.json['message']
    response = get_response(user_input)
    return jsonify({'message': response})

#Running the Flask app
if __name__ == '__main__':
    app.run(debug=True)