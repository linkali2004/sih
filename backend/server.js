const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Enable CORS for all routes
app.use(cors());

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/', // destination folder for the uploaded files
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Route to handle file upload and Python script execution
app.post('/upload-image', upload.single('image'), (req, res) => {
  const filePath = req.file.path;

  try {
    // Use path.resolve to get an absolute path to the Python script
    const scriptPath = path.resolve('../scripts/ocr.py');
    
    // Call the Python script, passing the file path as an argument
    const pythonProcess = spawn('py', [scriptPath, filePath]);

    // Capture the output from the Python script
    let scriptOutput = '';
    let scriptError = '';

    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
      console.log(scriptOutput);
    });

    pythonProcess.stderr.on('data', (data) => {
      scriptError += data.toString();
    });

    // Handle when the script finishes execution
    pythonProcess.on('close', (code) => {
      console.log(`Python script finished with code ${code}`);

      // Delete the uploaded file after processing
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        }
      });

      if (code === 0) {
        res.status(200).json({ message: `Script output: ${scriptOutput}` });
      } else {
        console.error(`Python script error output: ${scriptError}`);
        res.status(500).json({ message: `Script error: ${scriptError}` });
      }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Failed to process the image' });
  }
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
