const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const atob = require('atob');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });



function createFileFromBase64(dataURI, filename) {
  const base64Data = dataURI.split(',')[1];
  const binaryData = atob(base64Data);
  const buffer = Buffer.from(binaryData, 'binary');
  return buffer;
}

app.post('/voltias', upload.none() ,async (req, res) => {  
  try {
    console.log(req.body);
    const fileBuffer = createFileFromBase64(req.body.datauri, req.body.filename);

    const formData = new FormData();
    formData.append('files', fileBuffer, { filename: req.body.filename });

   
    const response = await axios.post('https://api.voltius.ai/uploadfiles/', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    

    res.json(response.data);
  } catch (error) {
   
    console.error('Error making API call:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});