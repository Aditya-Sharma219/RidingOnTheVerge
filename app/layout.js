import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// Example (Next.js font import)
import { Bebas_Neue } from "next/font/google";
import { Anton, Rubik } from 'next/font/google'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
})

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Riding On The Verge",
  description: "Bike Riding website for the bike lover by dharmendra Sharma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${rubik.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
