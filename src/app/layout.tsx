import type { Metadata } from 'next';
import './globals.css';

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
      <body className="min-h-screen bg-[#FAF7F2] text-[#14213D] antialiased flex flex-col selection:bg-amber-200 relative">
        {/* Cinematic Ambient Background Video Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-[0.14] filter contrast-125 sepia-[20%]"
          >
            <source src="/videos/bharat_ambient_bg.mp4" type="video/mp4" />
          </video>
          <div className="ambient-map-bg opacity-30" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]/90" />
        </div>

        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
