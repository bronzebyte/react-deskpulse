import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import deskpulseImage from "@/images/deskpulse.png";
import Cookies from "js-cookie";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const token = Cookies.get("token");
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">DeskPulse</h1>
          {!token ? (
            <div className="space-x-4">
              <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
              <Button onClick={() => router.push("/sign-up")}>Sign Up</Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>

      <main className="flex-grow items-center flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Welcome to DeskPulse
              </h2>
              <p className="mt-5 text-xl text-gray-500">
                Energize your workspace and boost productivity with DeskPulse.
                The smart solution for modern professionals.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <Image
                src={deskpulseImage}
                alt="Modern office desk with laptop and smart devices"
                width={800}
                height={600}
                className="rounded-lg shadow-xl object-none"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          © {currentYear} DeskPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
