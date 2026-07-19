import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://vcnpl.net'),
  title: 'Visual Connect Network | System Integrators & Technology Solutions',
  description: 'End-to-end system integration — CCTV, AV systems, networking, test equipment, UPS & office infrastructure. Trusted by Government, Defence, Corporate & Industrial sectors.',
  keywords: 'CCTV solutions, AV systems, network infrastructure, system integrator, PA systems, test equipment, India',
  icons: {
    icon: [
      { url: '/vcn_logo_with_tagline_squaresize.png' },
    ],
    shortcut: '/vcn_logo_with_tagline_squaresize.png',
    apple: '/vcn_logo_with_tagline_squaresize.png',
  },
  openGraph: {
    title: 'Visual Connect Network Pvt. Ltd.',
    description: 'Enterprise technology integration — CCTV, AV, networking, PA systems & infrastructure.',
    siteName: 'Visual Connect Network Pvt. Ltd.',
    images: [{ url: '/vcn_logo_with_tagline_squaresize.png' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}