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
import logo from "@/images/logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useTranslation } from "next-i18next";

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const FormSchema = z.object({
    userEmail: z.string().email({
      message: t("resetPassword.emailValidation"),
    }),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: "",
    },
  });

  function onSubmit(data) {
    toast({
      title: t("resetPassword.successMessage"),
    });
    form.reset();
  }
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="container">
        <nav className="flex justify-between items-center py-4 container mx-auto">
          <p className="text-title-md2 font-semibold text-black dark:text-white">
            {t("resetPassword.emailLabel")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-gray-600">
              {t("resetPassword.dashboard")}
            </Link>
            <span className="text-gray-400">/</span>
            <p className="text-blue-500">
              {t("resetPassword.resetPasswordTitle")}
            </p>
          </div>
        </nav>
        <div className="flex flex-col md:flex-row container mx-auto bg-white rounded-lg shadow-sm">
          <div className="w-full md:w-1/2 p-8 lg:p-12 border-r border-r-gray">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <div className="bg-blue-600 text-white p-2 rounded">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect width="24" height="24" rx="4" />
                </svg>
              </div>
              <span className="text-xl font-bold">TailAdmin</span>
            </div>

            <p className="text-gray-500 mb-8 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>

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
                        <FormLabel className="font-bold">
                          {t("resetPassword.emailLabel")}
                        </FormLabel>
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

                  <Button
                    type="submit"
                    className="text-white w-full bg-primary hover:bg-unset"
                  >
                    {t("resetPassword.buttonText")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
