"use client";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../config';
import { CartProvider } from '../context/ChartContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
        {children}
        </CartProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
