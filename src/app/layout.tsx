import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChemQuest | Chemical Engineering Study Platform',
  description: 'Study platform for Diploma Chemical Engineering V Semester students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 flex min-h-screen`}>
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 min-h-screen bg-gray-950">
          {children}
        </main>
      </body>
    </html>
  );
}
