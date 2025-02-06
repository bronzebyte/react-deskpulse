"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import googleLogo from "@/images/googleLogo.webp";
import logo from "@/images/logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { mutate } from "swr";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignInForm() {
  const { t } = useTranslation();
  const FormSchema = z.object({
    userEmail: z.string().email({
      message: t("signIn.emailValidation"),
    }),

    password: z
      .string()
      .min(6, { message: t("signIn.passwordValidation.minLength") })
      .regex(/[A-Z]/, {
        message: t("signIn.passwordValidation.capitalLetter"),
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: t("signIn.passwordValidation.specialCharacter"),
      }),
  });
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data?.userEmail,
          password: data?.password,
        }),
      });
      if (!response.ok) {
        const result = await response.json();
        toast({
          title: result?.message,
          variant: "destructive",
        });
      } else {
        const responseData = await response.text();
        localStorage.setItem("token", responseData);
        Cookies.set("token", responseData, {
          expires: 1,
          path: "/",
        })
        
        toast({ title: "Login Successful", className: "bg-[#07bc0c]" });
        form.reset();
      }

      mutate(`${API_BASE_URL}/login`);
    } catch (error) {
      console.log(error?.message, "error+++");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      {/* Header Navigation */}
      <div className="container">
        <nav className="flex justify-between items-center  py-4 container mx-auto">
          <p className="text-title-md2 font-semibold text-black dark:text-white">
            {t("signIn.buttonText")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-gray-600">
              {t("signIn.dashboard")}
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-blue-500">{t("signIn.buttonText")}</p>
          </div>
        </nav>
        <div className="flex flex-col md:flex-row container mx-auto bg-white rounded-lg shadow-sm">
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

          <div className="w-full md:w-1/2 p-8 lg:p-12 border-l border-l-gray">
            <div className="max-w-md mx-auto">
              

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="userEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("signIn.emailLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("signIn.passwordLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="6+ Characters, 1 Capital letter"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="text-white w-full bg-primary hover:bg-unset"
                  >
                    {loading ? "Loading..." : t("signIn.buttonText")}
                  </Button>

                  <Button
                    className="w-full flex bg-[#EFF4FB] hover:bg-unset text-[#64748B] items-center justify-center gap-2"
                    onClick={(e) => e.preventDefault()}
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

                  <p className="text-center text-gray-600">
                    {t("signIn.dontHaveAccount")}{" "}
                    <Link
                      href="/sign-up"
                      className="text-blue-600 hover:underline"
                    >
                      {t("signIn.signUp")}
                    </Link>
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
