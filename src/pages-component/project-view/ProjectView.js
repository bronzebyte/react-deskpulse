import { useEffect, useState } from "react";

import { TaskColumn } from "@/pages-component/taskColumn/TaskColumn";

import useSWR, { mutate } from "swr";
import Header from "@/components/common/header/Header";
import { useRouter } from "next/router";
import Sidebar from "@/components/common/sidebar/Sidebar";
import WorkSpaceHeader from "./Header";
import fetcher from "@/lib/fetcher";
import { AddList } from "@/pages-component/project-view/addList/AddList";

export default function ProjectView() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);

  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (router.query.projectId) {
      setProjectId(router.query.projectId);
    }
  }, [router.query]);

  const { data: projectData } = useSWR(
    projectId ? `/projects/${projectId}` : null,
    fetcher
  );

  useEffect(() => {
    setColumns(projectData);
  }, [projectData]);

  return (
    <>
      <Header />

      <div className="flex ">
        <Sidebar />
        <div
          className=" gap-4 overflow-x-hidden h-[calc(100vh-48px)] w-full"
          style={{
            background:
              "linear-gradient(135deg, rgb(13, 17, 23) 0%, rgb(88, 130, 80) 100%)",
          }}
        >
          <WorkSpaceHeader />
          <div className="flex gap-4 py-4 p-4 h-full overflow-x-auto">
            <TaskColumn columns={columns} setColumns={setColumns} />
            <AddList setColumns={setColumns} projectId={projectId} />
          </div>
        </div>
      </div>
    </>
  );
}
