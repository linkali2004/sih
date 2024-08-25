
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from './ClientProviders';  // Import the client-side providers

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sushrut Aushadruchi",
  description: "REVOLUTIONIZING DRUG INVENTORY WITH BLOCKCHAIN AND MACHINE LEARNING",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
