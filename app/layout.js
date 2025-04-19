import { Geist, Geist_Mono } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import { Anton, Rubik } from "next/font/google";
import { Inter } from "next/font/google";  // Correct import
import Navbar from "@/components/Navbar";



const inter = Inter({
  subsets: ['latin'],
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${rubik.variable} ${inter.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
