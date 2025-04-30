"use client";
import Link from "next/link";
import googleLogo from "@/images/googleLogo.webp";
import logo from "@/images/logo.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Button, Form, Input } from "@heroui/react";

export default function SignInForm() {

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center dark:bg-gray-900">
      {/* Header Navigation */}
      <div className="container">
        <nav className="flex justify-between items-center  py-4 container mx-auto">
          <p className="text-title-md2 font-semibold text-black dark:text-white">
            {t("signIn.buttonText")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600">
              {t("signIn.dashboard")}
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-blue-500">{t("signIn.buttonText")}</p>
          </div>
        </nav>
        <div className="flex flex-col md:flex-row container mx-auto bg-white rounded-lg shadow-sm dark:bg-gray-900">
          <div className="w-full md:w-1/2 p-8 lg:p-12 m-auto">


            <div className="relative h-64 md:h-96">
              <Image
                src={logo}
                alt="Sign In Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 lg:p-12 border-l border-l-gray dark:border-none">
            <div className="max-w-md mx-auto">


              <Form>



                <Input
                  isRequired
                  // placeholder="Enter your email"
                  variant="bordered"
                  type="email"
                  name="userEmail"
                  label={t("signIn.emailLabel")}
                />


                <Input
                  isRequired
                  // placeholder="6+ Characters, 1 Capital letter"
                  variant="bordered"
                  label={t("signIn.passwordLabel")}
                  name="password"
                  type="password"
                />

                <Button
                  type="submit"
                  className="text-white w-full bg-primary hover:bg-unset"
                >
                  {t("signIn.buttonText")}
                </Button>

                <Button
                  className="w-full flex bg-[#EFF4FB] hover:bg-unset text-[#64748B] items-center justify-center gap-2"
                >
                  <Image
                    src={googleLogo}
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  {t("signIn.signInWithGoogle")}
                </Button>

                <p className="text-center text-gray-600 w-full">
                  {t("signIn.dontHaveAccount")}{" "}
                  <Link
                    href="/sign-up"
                    className="text-blue-600 hover:underline"
                  >
                    {t("signIn.signUp")}
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
