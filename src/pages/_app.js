import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import "../../i18.js";
function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <Toaster />
    </>
  );
}
export default appWithTranslation(App);
