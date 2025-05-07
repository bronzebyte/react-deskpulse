import { Button } from "@heroui/button";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
    return (
        <div className="container !h-[calc(100vh-48px)] mx-auto flex justify-center">

            <div className="h-[calc(100vh-48px)] w-full max-w-md mx-auto flex flex-col items-center justify-center">
                <Mail className="w-20 h-20" />

                <div className="w-full pb-4 ">
                    <h1 className="text-center text-2xl font-semibold my-7">
                        Verify Your Email
                    </h1>
                    <p className="text-center text-manatee text-sm mt-3 w-full">
                        Check <span className="font-semibold text-base ">bbdotqa@gmail.com</span> to verify your account and get started
                    </p>
                    <div className="mt-7">
                        <Button type="button" className="w-full rounded-lg py-3 px-4 text-white text-sm font-medium bg-gradient-to-tr from-pink-500 to-yellow-500" >
                            Open Mail
                        </Button>
                    </div>
                    <div className="my-4">
                        <Button type="button" color="success" className="w-full p-5 rounded-lg  border border-pink text-pink text-sm font-medium" >
                            Resend email
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}