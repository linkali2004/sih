import os
import sys
import google.generativeai as genai 
from dotenv import load_dotenv
load_dotenv()
genai.configure(
    api_key="AIzaSyAeag4eROMoZYEpVrFBmiQNXLWyJucatL4"
)
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

def botresp(question):
    prompt = f"""Your name is sandeep and you are a chatbot for a drug suppy chain and inventory management system.
                You have to respond to queries of the users using the management system interface.
                Based on the above information respond to the following `query` 
                
                query: {question}"""
    response = chat.send_message(prompt)

    print(response.text)

#print(botresp(question = "hello sandeep!"))

if __name__ == "__main__":
    question = sys.argv[1]
    botresp(question)

