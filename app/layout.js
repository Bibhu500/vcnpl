import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


export const metadata = {
  title: 'Visual Connect Network | System Integrators & Technology Solutions',
  description: 'End-to-end system integration — CCTV, AV systems, networking, test equipment, UPS & office infrastructure. Trusted by Government, Defence, Corporate & Industrial sectors.',
  keywords: 'CCTV solutions, AV systems, network infrastructure, system integrator, PA systems, test equipment, India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}