"use client";
import Link from "next/link";
import logo from "@/images/logo.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Button, Form, Input } from "@heroui/react";
import ReCaptcha from "@/components/common/reCaptcha/ReCaptcha";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleLogIn from "@/pages-component/auth/GoogleLogin";

export default function SignInForm() {
  const { t } = useTranslation();
  const captchaRef = useRef(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const router = useRouter()
  const onSubmit = (e) => {
    e.preventDefault();
    const token = captchaRef.current?.getValue();
    if (!token) {
      setRecaptchaError(true);
      return;
    } else {
      setRecaptchaError(false);
    }

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setRecaptchaError(false);

    console.log(data);

    e.target.reset();
    router.push("/dashboard")
  };
  return (
    <div className="h-[calc(100vh-48px)] bg-gray-50 flex justify-center items-center dark:bg-gray-900">
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
              <Form onSubmit={onSubmit}>
                <Input
                  isClearable
                  isRequired
                  variant="bordered"
                  type="email"
                  name="userEmail"
                  label={t("signIn.emailLabel")}
                  validate={(value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                />

                <Input
                  isClearable
                  isRequired
                  variant="bordered"
                  label={t("signIn.passwordLabel")}
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 4) {
                      return "Username must be at least 4 characters long";
                    }
                    if ((value.match(/[A-Z]/g) || []).length < 1) {
                      return "Password needs at least 1 uppercase letter";
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                      return "Password needs at least 1 symbol";
                    }

                    return null;
                  }}
                />
                <div className="w-full">
                  <ReCaptcha
                    ref={captchaRef}
                    onChange={() => {
                      const token = captchaRef.current?.getValue();
                      if (token) {
                        setRecaptchaError(false);
                      }
                    }}
                  />
                </div>
                {recaptchaError && (
                  <p className="text-red-500">Verification required — please complete the reCAPTCHA.</p>
                )}
                <Button
                  type="submit"
                  className="text-white w-full bg-primary hover:bg-unset"
                >
                  {t("signIn.buttonText")}
                </Button>

                <GoogleLogIn />

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
