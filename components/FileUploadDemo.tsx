"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useWriteContract } from 'wagmi'; // Import the useWriteContract hook
import { abi } from '../abi/DrugRegistration.json'; // Import the ABI for the smart contract

interface Card {
  title: string;
  src: string;
}

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [response, setResponse] = useState<string | null>(null);
  const [validMessage, setValidMessage] = useState<string | null>(null); // State to hold the valid message from ML API
  const [force, setForce] = useState(false);
  const [current, setCurrent] = useState<Card | null>(null); // Set the type to Card or null

  const { data: hash, writeContract } = useWriteContract();

  const handleFileUpload = async (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      try {
        const file = uploadedFiles[0];

        const formData = new FormData();
        formData.append("image", file); // Name should match the API's expected field name

        const res = await fetch("http://localhost:4000/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        let outputMessage = data.message || "Your Uploaded Image";

        // Remove the "Script output: " prefix if it exists
        if (outputMessage.startsWith("Script output: ")) {
          outputMessage = outputMessage.replace("Script output: ", "");
        }

        const formattedResponse = JSON.stringify({ message: outputMessage }, null, 2);

        if (outputMessage.trim()) { // Only set validMessage if the output is not empty
          setValidMessage(outputMessage);
        }

        // Store the cleaned ML API output in local storage
        localStorage.setItem("mlApiResponse", formattedResponse);

        // Convert the image to a Base64 string after getting a successful response
        const base64String = await convertToBase64(file);

        // Create a card object with the cleaned title and image
        const newCard: Card = {
          title: outputMessage, // Use the cleaned message as the title
          src: base64String,
        };

        setCurrent(newCard);

        // Retrieve the existing cards from local storage, or initialize an empty array if none exist
        const storedCards = JSON.parse(localStorage.getItem("storedCards") || "[]");

        // Append the new card to the array
        storedCards.push(newCard);

        // Store the updated array in local storage
        localStorage.setItem("storedCards", JSON.stringify(storedCards));

        setResponse(formattedResponse);
        setForce(!force); // Trigger a state change to force re-render if needed
      } catch (error) {
        console.error("Error uploading file:", error);
        setResponse("Failed to upload image");
      }
    }
  };

  // Function to convert a file to a Base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to handle contract registration
  const handleRegister = () => {
    if (validMessage && current) {
      writeContract({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi,
        functionName: 'registerDrug',
        args: [current.title],
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Upload an Image</h2>
      <FileUpload onChange={handleFileUpload} />
      {response && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <pre className="text-sm text-black dark:text-white whitespace-pre-wrap break-words">
            {JSON.parse(response).message}
          </pre>
        </div>
      )}
{validMessage && (
  <div className="mt-4 flex flex-col items-center justify-center">
    {!hash ? (
      <button
        onClick={handleRegister}
        className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-neutral-500 dark:border-neutral-500 dark:text-neutral-300 text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
      >
        Register
      </button>
    ) : (
      <div className="text-center">
        <p className="text-lg font-bold text-green-600">
          Success! Drug registered.
        </p>
      </div>
    )}
  </div>
)}

    </div>
  );
}
