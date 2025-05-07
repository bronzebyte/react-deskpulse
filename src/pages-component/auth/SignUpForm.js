"use client";
import Link from "next/link";
import googleLogo from "@/images/googleLogo.webp";
import logo from "@/images/logo.png";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { addToast, Button, cn, Form, Input, ToastProvider } from "@heroui/react";
import GoogleLogIn from "./GoogleLogin";
import ReCaptcha from "@/components/common/reCaptcha/ReCaptcha";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import api from "@/lib/api";
export default function SignUpForm() {
  const { t } = useTranslation();

  const [recaptchaError, setRecaptchaError] = useState(false);
  const [value, setValue] = useState();

  const captchaRef = useRef(null);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = captchaRef.current?.getValue();
    if (!token) {
      setRecaptchaError(true);
      return;
    } else {
      setRecaptchaError(false);
    }
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const response = await api.post("/user", {
        email: data?.ee,
        password: data?.password,
        name: data?.firstName,
        phone: value
      });
      const responseData = response.data;
      if (responseData) {
        e.target.reset();
        router.push("/verify-email");

      }
    } catch (error) {
      <Button variant={"flat"} placement size="sm">

        {addToast({
          title: error?.message, color: "secondary", variant: "bordered", classNames: {
            base: cn([
              "bg-default-50 dark:bg-background shadow-sm top-20 w-[700px]",
              "border border-l-8 rounded-md rounded-l-none",
              "flex flex-col items-start",
              "border-primary-200 dark:border-primary-100 border-l-primary",
            ])
          }
        })}
      </Button>
    }
    setRecaptchaError(false);


  };
  console.log(value, "value");
  return (
    <>
      <ToastProvider placement={"top-left"} />

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
                <Form onSubmit={onSubmit}>
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
                    validate={(value) => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(value)) {
                        return "Please enter a valid email address";
                      }
                      return null;
                    }}
                  />

                  <PhoneInput
                    className="w-full  h-[50px]"
                    required
                    defaultCountry="IN"
                    onChange={setValue}
                    value={value}
                  />
                  <Input
                    isRequired
                    variant="bordered"
                    label={t("signUp.passwordLabel")}
                    type="password"
                    name="password"
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

                  <Input
                    isClearable
                    isRequired
                    variant="bordered"
                    label={t("signUp.reTypePasswordLabel")}
                    type="password"
                    name="confirmPassword"
                    validate={(value) => {
                      console.log(value, "valuefromForm");
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
                  <ReCaptcha
                    ref={captchaRef}
                    onChange={() => {
                      const token = captchaRef.current?.getValue();
                      if (token) {
                        setRecaptchaError(false);
                      }
                    }}
                  />
                  {recaptchaError && (
                    <p className="text-red-500">
                      Verification required — please complete the reCAPTCHA.
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="text-white w-full bg-primary hover:bg-unset"
                  >
                    {t("signUp.buttonText")}
                  </Button>

                  <GoogleLogIn />

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
    </>
  );
}
