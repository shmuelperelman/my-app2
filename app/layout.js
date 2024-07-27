'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { LoadingProvider } from '@/utils/contexts/loadingContext';
import Navbar from '@/utils/components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isAuthenticated && <Navbar />}
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
