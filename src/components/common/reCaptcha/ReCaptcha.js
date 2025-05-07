import React, { useRef, useImperativeHandle, forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY; // replace with your actual key

const ReCaptcha = forwardRef(({ onChange }, ref) => {
    const recaptchaRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getValue: () => recaptchaRef.current?.getValue(),
        reset: () => recaptchaRef.current?.reset(),
    }));

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={SITE_KEY}
            onChange={onChange}
        />
    );
});

export default ReCaptcha;
