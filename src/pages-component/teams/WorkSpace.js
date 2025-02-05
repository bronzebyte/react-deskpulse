"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { LayoutGrid, Settings, Users } from "lucide-react";
import Link from "next/link";
import { Drawer } from "@/components/common/drawer/Drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useSWR, { mutate } from "swr";
import { useTranslation } from "next-i18next";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const fetcher = (url) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
export default function WorkspaceDashboard() {
  const [teamData, setTeamData] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const { data, error } = useSWR(`${API_BASE_URL}/teams`, fetcher);
  const [teamProject, setTeamProjects] = useState([]);

  const { t } = useTranslation()
  const formSchema = z.object({
    title: z.string().min(1, { message: t("createProject.titleRequired") }),
    workspace: z.string().min(1),
    visibility: z.string().min(1),
    description: z.string().min(1, { message: t("createProject.descriptionRequired") })
  });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      workspace: "rajalwaysfirst's workspace",
      visibility: "Workspace",
      description: ""
    },
  });


  useEffect(() => {
    if (data) {
      setTeamData(data);

      // Fetch projects for each team
      data.forEach((team) => {
        fetch(`${API_BASE_URL}/teams/${team._id}/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  async function onSubmit(data) {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data?.title,
          description: data?.description,
          teamId:selectedTeamId
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        toast({
          title: responseData?.message || "project created failed",
          variant: "destructive",
        });
      } else {
        localStorage.setItem("projectId", responseData?._id)
        toast({ title: "Project has been created successfully", className: "bg-[#07bc0c]" });
        form.reset();
        setSelectedTeamId(null);

      }
      mutate(`${API_BASE_URL}/projects`);
    } catch (error) {
      console.log(error?.message, "error+++");
    } finally {
      setIsLoading(false)
    }
  }
  const router = useRouter();
  return (
    <>
      {Array.isArray(teamData) && teamData.map((item) => {
        return (
          <React.Fragment key={item?._id}>
            <div className="bg-background w-fit">
              <header className="border-b">
                <div className="container flex h-14 items-center px-4">

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600 text-white">
                      {item?.title?.toUpperCase()?.slice(0,1)}
                    </div>
                    <span className="font-semibold">{item?.title}</span>
                  </div>
                  <nav className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" className="gap-2">
                      <LayoutGrid className="h-4 w-4" />
                      Boards
                    </Button>
                    <Button variant="ghost">Views</Button>
                    <Button
                      variant="ghost"
                      className="gap-2"
                      onClick={() => router.push(`/members/${item?._id}`)}
                    >
                      <Users className="h-4 w-4" />
                      Members (1)
                    </Button>
                    <Button variant="ghost" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="outline" className="ml-2">
                      Upgrade
                    </Button>
                  </nav>


                </div>
              </header>
              <main className="container px-4 py-6">
                <div className="flex gap-4">
                {teamProject[item?._id]?.map((item)=>{
                    return(

                  <Link href={`/project-view/${item?._id}`}>
                    <Card className="group relative aspect-[1.5] overflow-hidden w-[193px] h-[96px] rounded-none">
                      <div className="bg-gray-500" />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-0 p-4">
                        <h3 className="text-lg font-semibold text-white">{item?.title}</h3>
                      </div>
                    </Card>
                  </Link>
                    )
                  })}
                  {/* <Link href="#project-b">
                    <Card className="group relative aspect-[1.5] overflow-hidden w-[193px] h-[96px] rounded-none">
                      <div className="bg-gray-500" />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-0 p-4">
                        <h3 className="text-lg font-semibold text-white">Project B</h3>
                      </div>
                    </Card>
                  </Link>
                  <Link href="#welcome">
                    <Card className="group relative aspect-[1.5] bg-emerald-500 w-[193px] h-[96px] rounded-none">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">
                          Welcome Board
                        </h3>
                      </div>
                    </Card>
                  </Link> */}

                  {/* Sheet for Create New Board */}
                  <Drawer isOpen={selectedTeamId===item?._id} setIsOpen={(open) => setSelectedTeamId(open ? item?._id : null)}>
                    <SheetTrigger asChild>
                      <Card
                        className="group relative aspect-[1.5] !bg-white p-4 cursor-pointer w-[193px] h-[96px] rounded-none"
                        onClick={() =>
                          setSelectedTeamId(item?._id)
                          }

                      >
                        <div className="flex h-full flex-col items-start justify-between">
                          <h3 className="text-lg font-semibold">Create new board</h3>
                          <p className="text-sm text-muted-foreground">7 remaining</p>
                        </div>
                      </Card>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] p-6">
                      <h2 className="text-xl font-semibold mb-4">{t("createProject.createNewBoard")}</h2>

                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("createProject.titleLabel")}</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter board title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("createProject.descriptionLabel")}</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter board descrioption" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="workspace"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("createProject.workspaceLabel")}</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select workspace" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="rajalwaysfirst's workspace">
                                      rajalwaysfirst's workspace
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="visibility"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("createProject.visibilityLabel")}</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Workspace">Workspace</SelectItem>
                                    <SelectItem value="Public">Public</SelectItem>
                                    <SelectItem value="Private">Private</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />

                          <div className="pt-2">
                            <Button type="submit" className="w-full bg-primary">
                              {isLoading ? "Loading" : t("createProject.buttonText")}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </SheetContent>
                  </Drawer>
                </div>
              </main>
            </div>
          </React.Fragment>
        )
      })}
    </>
  );
}
