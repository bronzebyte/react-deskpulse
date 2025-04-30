import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import "../../i18.js";
import { HeroUIProvider } from "@heroui/react";
import 'react-quill/dist/quill.snow.css';
// import Header from "@/components/common/header/Header.js";

import 'tailwindcss/tailwind.css'
import dynamic from "next/dynamic.js";
const Header = dynamic(() => import('@/components/common/header/Header.js'), { ssr: false });
function App({ Component, pageProps }) {
  return (
    <>
      <HeroUIProvider>
        <Header />
        <Component {...pageProps} />
      </HeroUIProvider>
    </>
  );
}
export default appWithTranslation(App);
