// CartContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartContextType {
  cartData: number;
  increaseCartData: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<number>(0);

  const increaseCartData = () => {
    setCartData((prev) => prev + 1);
  };

  return (
    <CartContext.Provider value={{ cartData, increaseCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
