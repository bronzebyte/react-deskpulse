import RecentlyViewed from "@/pages-component/teams/RecentlyView";
import WorkspaceDashboard from "@/pages-component/teams/WorkSpace";
import { Sidebar } from "@/pages-component/teams/Sidebar";
import Header from "@/components/common/header/Header";

export default function Projects() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen container ml-auto py-6">
        <Sidebar />

        <div className="p-4">
          <RecentlyViewed title="Starred boards" />

          <RecentlyViewed title="Recently viewed" />

          <div className="mb-8">
            <WorkspaceDashboard />
          </div>
        </div>
      </div>
    </>
  );
}
