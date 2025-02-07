"use client";

import React, { useEffect, useState } from "react";

import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import { TeamHeader } from "@/pages-component/teams/TeamHeader";
import { GetProjects } from "./GetProjects";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function WorkspaceDashboard() {
  const [teamData, setTeamData] = useState([]);
  const { data, error } = useSWR(`/teams`, fetcher);
  const [teamProject, setTeamProjects] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTeamData(data);
      data.forEach((team) => {
        fetch(`${API_BASE_URL}/teams/${team._id}/projects`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((projects) => {
            setTeamProjects((prev) => ({ ...prev, [team._id]: projects }));
          })
          .catch((err) => console.error("Error fetching projects:", err));
      });
    }
  }, [data]);

  return (
    <>
      {Array.isArray(teamData) &&
        teamData.map((item, index) => {
          return (
            <React.Fragment key={item?._id}>
              <div className="bg-background w-fit">
                <TeamHeader item={item} />
                <GetProjects
                  item={item}
                  teamProject={teamProject}
                  index={index}
                  teamData={teamData}
                  setTeamProjects={setTeamProjects}
                />
              </div>
            </React.Fragment>
          );
        })}
    </>
  );
}
