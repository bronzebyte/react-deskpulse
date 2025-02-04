import dynamic from 'next/dynamic';

const ResetPasswordForm = dynamic(() => import('@/pages-component/auth/ResetPasswordForm'), {
    ssr: false, // Disable SSR for this component
  });
export default function ResetPassword() {
    return (
        <ResetPasswordForm />
    )
}