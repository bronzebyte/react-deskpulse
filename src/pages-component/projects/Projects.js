import RecentlyViewed from "@/pages-component/projects/RecentlyView";
import WorkspaceDashboard from "@/pages-component/projects/WorkSpace";
import { Sidebar } from "@/pages-component/projects/Sidebar";

export default function Projects() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6">
                <RecentlyViewed title="Starres boards" />

                <RecentlyViewed title="Recently viewed" />

                <div className="mb-8">
                    <WorkspaceDashboard />
                </div>
            </div>
        </div>
    );
}
