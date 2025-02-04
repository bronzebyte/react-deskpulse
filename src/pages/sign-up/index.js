import dynamic from "next/dynamic";
const SignUpForm = dynamic(() => import('@/pages-component/auth/SignUpForm'), {
    ssr: false, // Disable SSR for this component
  });
export default function SignUp() {
    return (
        <SignUpForm />
    )
}