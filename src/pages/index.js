import dynamic from "next/dynamic";


const HomePage = dynamic(() => import("@/pages-component/home/Home"), {
  ssr: false,
});
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
