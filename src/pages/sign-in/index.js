import dynamic from 'next/dynamic';

const SignInForm = dynamic(() => import('@/pages-component/auth/SignInForm'), {
    ssr: false, // Disable SSR for this component
  });
export default function SignIn() {
    return (
        <SignInForm />
    )
}