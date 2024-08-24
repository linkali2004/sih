import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/', // destination folder for the uploaded files
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Disable the built-in body parser for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to run multer middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Apply multer middleware to handle file upload
    await runMiddleware(req, res, upload.single('image'));

    // Access the uploaded file
    const filePath = (req as any).file.path;

    // Call the Python script
    const pythonProcess = spawn('python3', ['../../scripts/ocr.py', filePath]);

    // Capture the output from the Python script
    let scriptOutput = '';
    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script error: ${data}`);
      res.status(500).json({ message: `Script error: ${data.toString()}` });
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

      res.status(200).json({ message: `Script output: ${scriptOutput}` });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Failed to process the image' });
  }
}
