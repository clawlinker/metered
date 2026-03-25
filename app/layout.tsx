import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Metered - Product Hunt for Paid APIs',
  description: 'Discover, upvote, and review metered APIs — protocol-agnostic (x402, MPP, ACP, and whatever comes next).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
