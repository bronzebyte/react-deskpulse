import Sidebar from "@/components/common/sidebar/Sidebar";
import WorkSpaceHeader from "./Header";



export default function ProjectView() {


  return (
    <>

      <div className="flex ">
        <Sidebar />
        <div
          className=" gap-4 overflow-x-hidden h-[calc(100vh-48px)] w-full text-black"

        >
          <WorkSpaceHeader />

        </div>
      </div>
    </>
  );
}
