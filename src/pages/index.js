import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="text-center p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Website DeskPulse!</h1>
      </div>
    </div>
  );
}
