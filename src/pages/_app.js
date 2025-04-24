import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import "../../i18.js";
import { HeroUIProvider } from "@heroui/react";

function App({ Component, pageProps }) {
  return (
    <>
      <HeroUIProvider>

        <Component {...pageProps} />
      </HeroUIProvider>

    </>
  );
}
export default appWithTranslation(App);
