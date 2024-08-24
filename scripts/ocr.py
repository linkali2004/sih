from PIL import Image
import pytesseract
import cv2
import base64
import os
import sys
import google.generativeai as genai 
from dotenv import load_dotenv
load_dotenv()
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
genai.configure(
    api_key="AIzaSyAeag4eROMoZYEpVrFBmiQNXLWyJucatL4"
)
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])
# construct the argument parse and parse the arguments


def getname(image_as_str):
    image = cv2.imread(image_as_str)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    filename = "{}.png".format(os.getpid())
    cv2.imwrite(filename, gray)
    text = pytesseract.image_to_string(Image.open(filename))
    os.remove(filename)
    
    prompt = f"""In the given string output any medicine name
            *****
            Example 1:
            description: 20x 10 Tablets\r\n\r\nParacetamol Tablets IP\r\nINTEMOL-500\r\n\r\nTablets\r\n\r\n\r\n

            response : Paracetamol
            *****

            Now based on above example answer the following query

            description: {text}
            response:

    """

    response = chat.send_message(prompt)
    print(response.text)

if __name__ == "__main__":
    filePath = sys.argv[1]
    getname(filePath)
