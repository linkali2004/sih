"use client";
import "./globals.css";
import {BackgroundBeamsWithCollisionDemo} from "../components/BackgroundBeamsWithCollisionDemo";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../config'

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <BackgroundBeamsWithCollisionDemo></BackgroundBeamsWithCollisionDemo>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
