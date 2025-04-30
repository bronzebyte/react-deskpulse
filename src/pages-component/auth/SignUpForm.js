"use client";
import Link from "next/link";
import googleLogo from "@/images/googleLogo.webp";
import logo from "@/images/logo.png";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Button, Form, Input } from "@heroui/react";

export default function SignUpForm() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center dark:bg-gray-900">
      <div className="container">
        <nav className="flex justify-between items-center py-4 container mx-auto">
          <p className="text-title-md2 font-semibold text-black dark:text-white">
            {t("signUp.signUp")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600">
              {t("signUp.dashboard")}
            </Link>
            <span className="text-gray-400">/</span>
            <p href="/Sign In" className="text-blue-500">
              {t("signUp.signUp")}
            </p>
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
                  variant="bordered"
                  type="text"
                  label={t("signUp.firstNameLabel")}
                  name="firstName"
                />

                <Input
                  isRequired
                  variant="bordered"
                  type="text"
                  label={t("signUp.lastNameLabel")}
                  name="lastName"
                />

                <Input
                  isRequired
                  variant="bordered"
                  label={t("signUp.emailLabel")}
                  type="email"
                  name="userEmail"
                />

                <Input
                  isRequired
                  variant="bordered"
                  label={t("signUp.phoneNumberLabel")}
                  type="number"
                  name="phoneNumber"
                />

                <Input
                  isRequired
                  variant="bordered"
                  label={t("signUp.passwordLabel")}
                  type="password"
                  name="password"
                />

                <Input
                  isRequired
                  variant="bordered"
                  label={t("signUp.reTypePasswordLabel")}
                  type="password"
                  name="confirmPassword"
                />

                <Button
                  type="submit"
                  className="text-white w-full bg-primary hover:bg-unset"
                >
                  {t("signUp.buttonText")}
                </Button>

                <Button className="w-full flex bg-[#EFF4FB] hover:bg-unset text-[#64748B] items-center justify-center">
                  <Image
                    src={googleLogo}
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  {t("signUp.signUpWithGoogle")}
                </Button>

                <p className="text-center text-gray-600">
                  {t("signUp.alreadyHaveAccount")}{" "}
                  <Link
                    href="/sign-in"
                    className="text-blue-600 hover:underline"
                  >
                    {t("signUp.signIn")}
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
