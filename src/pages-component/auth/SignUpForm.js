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

const FormSchema = z.object({
    userEmail: z
    .string()
    .email({
        message: "Please enter a valid email address.",
    }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one capital letter.",
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Password must contain at least one special character.",
        }),
    confirmPassword: z
        .string()
        .min(6, { message: "Confirm Password must be at least 6 characters." })
        .regex(/[A-Z]/, {
            message: "Confirm Password must contain at least one capital letter.",
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Confirm Password must contain at least one special character.",
        })
        ,
    userName: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

export const SignUpForm = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userEmail: "",
            password: "",
            confirmPassword: "",
            userName: "",
        },
    });

    function onSubmit(data) {
        toast({
            title: "SignUp Successfully",
        });
        form.reset();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="container">
                <nav className="flex justify-between items-center py-4 container mx-auto">
                    <p className="text-title-md2 font-semibold text-black dark:text-white">
                        Sign Up
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="text-gray-600">
                            Dashboard
                        </Link>
                        <span className="text-gray-400">/</span>
                        <p href="/Sign In" className="text-blue-500">
                            Sign Up
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
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
                                        name="userName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your full name"
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
                                                <FormLabel>Email</FormLabel>
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
                                                <FormLabel>Password</FormLabel>
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
                                                <FormLabel>Re-type Password</FormLabel>
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
                                        Create Account
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
                                        Sign up with Google
                                    </Button>

                                    <p className="text-center text-gray-600">
                                        Already have an account?{" "}
                                        <Link
                                            href="/sign-in"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Sign in
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
