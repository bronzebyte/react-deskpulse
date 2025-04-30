"use client";
import Link from "next/link";
import logo from "@/images/logo.png";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Button, Form, Input } from "@heroui/react";

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center dark:bg-black">
      <div className="container">
        <nav className="flex justify-between items-center py-4 container mx-auto">
          <p className="text-title-md2 font-semibold text-black dark:text-white">
            {t("resetPassword.emailLabel")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600">
              {t("resetPassword.dashboard")}
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-blue-500">
              {t("resetPassword.resetPasswordTitle")}
            </p>
          </div>
        </nav>
        <div className="flex flex-col md:flex-row container mx-auto bg-white rounded-lg shadow-sm dark:bg-black">
          <div className="w-full md:w-1/2 p-8 lg:p-12 border-r border-r-gray dark:border-none m-auto">
            <div className="relative h-64 md:h-96">
              <Image
                src={logo}
                alt="Sign In Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 lg:p-12 m-auto">
            <div className="max-w-md mx-auto">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                {t("resetPassword.resetPasswordTitle")}
              </h2>
              <p class="mb-8">{t("resetPassword.resetPasswordDescription")}</p>
              <Form>
                <Input
                  isRequired
                  variant="bordered"
                  label={t("resetPassword.emailLabel")}
                  type="email"
                  name="userEmail"
                />

                <Button
                  type="submit"
                  className="text-white w-full bg-primary hover:bg-unset"
                >
                  {t("resetPassword.buttonText")}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
