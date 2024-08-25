"use client";
import { useEffect, useState } from "react";
import { FocusCards } from "@/components/ui/focus-cards";

// Define the type for the card object
interface Card {
  title: string;
  src: string;
}

export function FocusCardsDemo() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    // Retrieve the cards array from local storage
    const storedCards = localStorage.getItem("storedCards");

    if (storedCards) {
      console.log("Retrieved cards from local storage:", storedCards); // Debugging log
      const parsedCards: Card[] = JSON.parse(storedCards);
      console.log("Parsed cards:", parsedCards); // Debugging log
      setCards(parsedCards);
    }
  }, []);

  return (
    <div>
      {cards.length > 0 ? (
        <FocusCards cards={cards} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            No images are available
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
            Please upload an image to see it displayed here.
          </p>
        </div>
      )}
    </div>
  );
}
