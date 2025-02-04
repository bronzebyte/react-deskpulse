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


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignUpForm () {
const { t } = useTranslation();

    const FormSchema = z
    .object({
        userEmail: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z
            .string()
            .min(6, { message: t("signUp.emailValidation") })
            .regex(/[A-Z]/, {
                message: t("signUp.passwordValidation.capitalLetter"),
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message: t("signUp.passwordValidation.specialCharacter"),
            }),
        confirmPassword: z
            .string()
            .min(6, { message: t("signUp.passwordValidation.minLength") })
            .regex(/[A-Z]/, {
                message: t("signUp.passwordValidation.capitalLetter"),
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message:
                t("signUp.passwordValidation.specialCharacter"),
            }),
        firstName: z.string().min(4, {
            message: t("signUp.firstNameMinLength"),
        }),
        lastName: z.string().min(4, {
            message: t("signUp.lastNameMinLength"),
        }),
        phoneNumber: z.string().min(10, {
            message: t("signUp.phoneNumberMinLength"),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: t("signUp.passwordMismatch"),
        path: ["confirmPassword"],
    });

    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userEmail: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
        },
    });

    async function onSubmit(data) {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname: data?.firstName,
                    lastname: data?.lastName,
                    phonenumber: data?.phoneNumber,
                    email: data?.userEmail,
                    password: data?.password,
                }),
            });
            const result = await response.json()
            if (!response.ok) {
                toast({
                    title: result?.message,
                    variant: "destructive",
                });
            } else {
                toast({ title: "SignUp Successful", className: "bg-[#07bc0c]" });
                form.reset();
            }

            mutate(`${API_BASE_URL}/signup`);
        } catch (error) {
            console.log(error?.message, "error+++");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="container">
                <nav className="flex justify-between items-center py-4 container mx-auto">
                    <p className="text-title-md2 font-semibold text-black dark:text-white">
                       {t("signUp.signUp")}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="text-gray-600">
                            {t("signUp.dashboard")}
                        </Link>
                        <span className="text-gray-400">/</span>
                        <p href="/Sign In" className="text-blue-500">
                        {t("signUp.signUp")}
                        </p>
                    </div>
                </nav>
                <div className="flex flex-col md:flex-row container mx-auto bg-white rounded-lg shadow-sm">
                    <div className="w-full md:w-1/2 p-8 lg:p-12">
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

                    <div className="w-full md:w-1/2 p-8 lg:p-12 border-l border-l-gray">
                        <div className="max-w-md mx-auto">
                            <p className="text-blue-600 font-medium mb-2">Start for free</p>
                            <h2 className="text-2xl font-bold mb-8">Sign Up to TailAdmin</h2>

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="w-full space-y-3"
                                >
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("signUp.firstNameLabel")}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your firstName"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("signUp.lastNameLabel")}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your lastName"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="userEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("signUp.emailLabel")}</FormLabel>
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
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("signUp.phoneNumberLabel")}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your phoneNumber"
                                                        {...field}
                                                        type="number"
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
                                                <FormLabel>{t("signUp.passwordLabel")}</FormLabel>
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
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("signUp.reTypePasswordLabel")}</FormLabel>
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
                                        {loading ? "Sending..." : t("signUp.buttonText")}
                                    </Button>

                                    <Button
                                        className="w-full flex bg-[#EFF4FB] hover:bg-unset text-[#64748B] items-center justify-center"
                                        onClick={(e) => e.preventDefault()}
                                    >
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
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
