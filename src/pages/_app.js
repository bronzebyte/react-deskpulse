import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  <Toaster/>
  </>;
}
