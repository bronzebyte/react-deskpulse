import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const HomePage = dynamic(() => import('@/pages-component/home/Home'), {
    ssr: false, // Disable SSR for this component
  });
export default function Home() {
  
  return (
    <HomePage/>
  );
}
