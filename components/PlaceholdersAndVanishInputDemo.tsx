"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

// Function to call the chatbot API
async function askChatbot(question: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:4000/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error communicating with chatbot:", error);
    throw error;
  }
}

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const chatbotResponse = await askChatbot(inputValue); // Call the chatbot API
      setResponse(chatbotResponse); // Save the response to state to display it
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Ask Our ChatBot Anything Related To Drugs
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
            {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow mb-2">
          <p className="text-lg">{response}</p>
        </div>
      )}
    </div>
  );
}
