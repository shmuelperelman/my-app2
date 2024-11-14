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
    // Function to check authentication status
    const checkAuth = () => {
      const token = getCookie('token');
      setIsAuthenticated(!!token);
    };

    // Check initial auth status
    checkAuth();

    // Set up interval to check auth status
    const interval = setInterval(checkAuth, 100);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
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