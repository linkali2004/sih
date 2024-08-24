"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileUpload = async (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      try {
        const formData = new FormData();
        formData.append("image", uploadedFiles[0]); // Name should match the API's expected field name

        const res = await fetch("http://localhost:4000/upload-image", { // Update with your Node.js server API route
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error uploading file:", error);
        setResponse("Failed to upload image");
      }
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
    </div>
  );
}
