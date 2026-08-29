import type { Metadata } from 'next';
import './globals.css';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';

export const metadata: Metadata = {
  title: 'India, That Is Bharat | Class VI Social Science Learning Studio',
  description: 'A complete interactive digital learning experience for NCERT Class 6 Social Science Chapter 5: India, That Is Bharat (Theme B: Tapestry of the Past).',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAF7F2]/80 text-[#14213D] antialiased flex flex-col selection:bg-amber-200 relative">
        <BackgroundVideo />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
