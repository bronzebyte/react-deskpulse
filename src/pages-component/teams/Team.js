import RecentlyViewed from "@/pages-component/teams/RecentlyView";
import WorkspaceDashboard from "@/pages-component/teams/WorkSpace";
import { Sidebar } from "@/pages-component/teams/Sidebar";
import { CreateTeam } from "@/pages-component/teams/CreateTeam";

export default function Projects() {

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar />

                <div className="flex-1 p-6">
                    <CreateTeam />
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
