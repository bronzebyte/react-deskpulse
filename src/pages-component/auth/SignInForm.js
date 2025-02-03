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
});
export default function SignInForm() {


    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userEmail: "",
            password: "",
        },
    });

    function onSubmit(data) {
        toast({
            title: "Sign In Successfully",

        });
        form.reset()
    }
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            {/* Header Navigation */}
            <div className="container">
                <nav className="flex justify-between items-center  py-4 container mx-auto">
                    <p className="text-title-md2 font-semibold text-black dark:text-white">
                        Sign In
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/dashboard" className="text-gray-600">
                            Dashboard
                        </Link>
                        <span className="text-gray-400">/</span>
                        <p className="text-blue-500">
                            Sign In
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
                            <h2 className="text-2xl font-bold mb-8">Sign In to TailAdmin</h2>

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
                                        Sign In
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
                                        Sign in with Google
                                    </Button>

                                    <p className="text-center text-gray-600">
                                        Don't have any account?{" "}
                                        <Link
                                            href="/sign-up"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Sign Up
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
