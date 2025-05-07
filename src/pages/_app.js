import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import "../../i18.js";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import 'react-quill/dist/quill.snow.css';
// import Header from "@/components/common/header/Header.js";
import 'react-phone-number-input/style.css'
import 'suneditor/dist/css/suneditor.min.css';
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
