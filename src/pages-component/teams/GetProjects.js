import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger, SheetContent } from "@/components/ui/sheet";
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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutate } from "swr";
export const GetProjects = ({
  item,
  teamProject,
  index,
  teamData,
  setTeamProjects,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawerIndex, setOpenDrawerIndex] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const { t } = useTranslation();
  const formSchema = z.object({
    title: z.string().min(1, { message: t("createProject.titleRequired") }),
    workspace: z
      .string()
      .min(1, { message: t("createProject.selectWorkSpace") }),
    description: z
      .string()
      .min(1, { message: t("createProject.descriptionRequired") }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      workspace: "",
      visibility: "Workspace",
      description: "",
    },
  });
  async function onSubmit(data) {
    const refetchData = () => {
      mutate(`/teams/${selectedTeamId}/projects`);
    };
    try {
      const response = await api.post(`/projects`, {
        title: data?.title,
        description: data?.description,
        teamId: selectedTeamId,
      });

      const responseData = await response.data;
      if (responseData) {
        toast({
          title: t("createProject.projectCreatedSuccessFully"),
          className: "bg-[#07bc0c]",
        });
        form.reset();
        setSelectedTeamId(null);
        setOpenDrawerIndex(null);
        refetchData();
      } else {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      }
      mutate(`/projects`);
      refetchData();
      setTeamProjects((prev) => ({
        ...prev,
        [selectedTeamId]: [...(prev[selectedTeamId] || []), responseData],
      }));
    } catch (error) {
      console.log(error?.message, "error+++");
    }
  }
  const router = useRouter();

  useEffect(() => {
    if (selectedTeamId) {
      const selectedTeam = teamData.find((team) => team._id === selectedTeamId);
      if (selectedTeam) {
        form.setValue("workspace", selectedTeam.title, {
          shouldValidate: true,
        });
      }
    }
  }, [selectedTeamId, teamData]);
  return (
    <main className="container px-4 py-6">
      <div className="grid grid-cols-4 gap-4">
        {teamProject[item?._id]?.map((item, index) => {
          return (
            <Link href={`/project-view/${item?._id}`} key={item?._id}>
              <Card className="group relative aspect-[1.5] overflow-hidden w-[193px] h-[96px] rounded-none">
                <div className="bg-green-500" />
                <div className="absolute inset-0 bg-gray-500" />
                <div className="absolute bottom-0 p-4">
                  <p className="text-lg font-bold text-white">{item?.title}</p>
                </div>
              </Card>
            </Link>
          );
        })}

        <Drawer
          isOpen={openDrawerIndex === index}
          setIsOpen={(open) => {
            if (!open) {
              setOpenDrawerIndex(null);
            }
          }}
        >
          <SheetTrigger asChild>
            <Card
              className="group relative aspect-[1.5] !bg-white p-4 cursor-pointer w-[193px] h-[96px] rounded-none"
              onClick={() => {
                setOpenDrawerIndex(index);
                setSelectedTeamId(item?._id);
              }}
            >
              <div className="flex h-full flex-col items-start justify-center">
                <h3 className="text-lg font-semibold">
                  {t("createProject.createNewBoard")}
                </h3>
              </div>
            </Card>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("createProject.createNewBoard")}
            </h2>

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
                      <FormLabel>
                        {t("createProject.descriptionLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter board descrioption"
                          {...field}
                        />
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
                        onValueChange={(value) => {
                          const selectedTeam = teamData.find(
                            (team) => team.title === value
                          );
                          setSelectedTeamId(selectedTeam?._id);
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select workspace" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teamData?.map((item) => {
                            return (
                              <SelectItem value={item?.title} key={item?._id}>
                                {item?.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white"
                  >
                    {isLoading ? "Loading" : t("createProject.buttonText")}
                  </Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Drawer>
      </div>
    </main>
  );
};
