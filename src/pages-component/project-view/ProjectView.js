import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { TaskColumn } from "@/pages-component/taskColumn/TaskColumn";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/common/header/Header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Sidebar from "@/components/common/sidebar/Sidebar";
import WorkSpaceHeader from "./Header";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const fetcher = (url) => {
  const token = Cookies.get('token');
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
export default function ProjectView() {
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (router.query.projectId) {
      setProjectId(router.query.projectId);
    }
  }, [router.query]);
  const token = Cookies.get('token');

  const { data: projectData } = useSWR(projectId?`${API_BASE_URL}/projects/${projectId}`:null,
    fetcher
  );
  const formSchema = z.object({
    title: z.string().min(1, { message: "List title is required" }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  
  useEffect(()=>{
    setColumns(projectData)
  },[projectData])


  async function onSubmit(data) {
    const token = Cookies.get('token')
    const refetchData = () => {
      mutate(`${API_BASE_URL}/projects/${projectId}`);
    };
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data?.title,
          sortOrder: "0"
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      } else {
        toast({ title: responseData.message, className: "bg-[#07bc0c]" });
        setColumns((prev) => ({
          ...prev,
          [responseData._id]: { title: data.title, tasks: [] },
        }));
        form.reset();
        refetchData()
        setIsAddingList(false);
      }

      mutate(`${API_BASE_URL}/projects/${projectId}/lists`);
    } catch (error) {
      console.log(error?.message, "error+++");
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
    <Header/>

    <div className="flex ">
    <Sidebar/>
    <div
      className=" gap-4 overflow-x-hidden h-[calc(100vh-48px)] w-full"
      style={{
        background:
        "linear-gradient(135deg, rgb(13, 17, 23) 0%, rgb(88, 130, 80) 100%)",
      }}
      >
      <WorkSpaceHeader/>
      <div className="flex gap-4 py-4 p-4 h-full overflow-x-auto">
      <TaskColumn columns={columns} setColumns={setColumns} />
      {isAddingList ? (
        <div className="w-72">
          <Card className="bg-white text-black border-0">
            <CardContent className="p-3">
              <Form {...form} className="mt-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            className="mb-2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-unset"
                      type="submit"
                    >
                      Add List
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingList(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>


            </CardContent>
          </Card>
        </div>
      ) : (
        <Button
          // variant="ghost"
          size="sm"
          className="w-72 justify-center bg-primary hover:bg-unset"
          onClick={() => setIsAddingList(true)}
        >
          Add a new list
        </Button>
      )}
    </div>
    </div>
    </div>
    </>
  );
}