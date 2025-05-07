// GoogleLogIn.js
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import googleLogo from "@/images/googleLogo.webp";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "@heroui/button";

const GoogleLogIn = () => {
    const { t } = useTranslation();
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        console.log("User Info:", decoded);
    };

    const handleError = () => {
        console.error("Google Sign-In failed");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="my-2 w-full">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    render={(renderProps) => (
                        <Button
                            className="w-full flex bg-[#EFF4FB] hover:bg-unset text-[#64748B] items-center justify-center gap-2"
                            onPress={renderProps.onClick}
                            disabled={renderProps.disabled}
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
                    )}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLogIn;
