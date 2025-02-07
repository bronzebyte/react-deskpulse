import dynamic from "next/dynamic";
const Members = dynamic(() => import('@/pages-component/members/Members'), {
    ssr: false, // Disable SSR for this component
  });
export default function index(){
    return(
        <Members/>
    )
}