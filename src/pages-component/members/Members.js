import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, Users, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberSidebar } from "@/pages-component/members/Sidebar";
import { useState } from "react";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useTranslation } from "next-i18next";

export default function Members() {
  const { t } = useTranslation();
  const formSchema = z.object({
    email: z.string().min(1, { message: t("members.emailRequired") }),
  });
  const router = useRouter();
  const { teamId } = router.query;
  const [isLoading, setIsLoading] = useState();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const response = await api.post(`/teams/${teamId}/member`, {
        email: data?.email,
        role: "member",
      });

      const responseData = response.data;
      if (responseData) {
        form.reset();
        mutate(`/teams/${teamId}/member`);
      } else {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error?.message, "error+++");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-background container mx-auto">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                MYROM
                <span className="inline-flex items-center">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-normal text-muted-foreground">
                    Private
                  </span>
                </span>
              </h1>
            </div>
          </div>

          {/* Invite Button with Modal */}
          <Dialog className="!bg-white">
            <DialogTrigger asChild>
              <Button>
                <Users className=" h-4 w-4" />
                Invite to workspace
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>{t("members.inviteToWorkSpace")}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("members.boardTitleLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email address or name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between gap-2">
                    <p>{t("members.inviteSomeoneToWorkSpace")}</p>
                    <Button type="submit" className="bg-primary text-white">
                      {t("members.copyLink")}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex gap-8">
          <MemberSidebar />

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                {t("members.workSpaceMember")} (1)
              </h2>
              <p className="text-muted-foreground">
                {t("members.workSpaceDescription")}
              </p>
            </div>

            <div className="space-y-4">
              <Input placeholder="Filter by name" className="max-w-sm" />

              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>WQ</AvatarFallback>
                    <AvatarImage
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YiJeuBbzxWiZxSQ5HY8sxQaMT3Ufha.png"
                      alt="Web Qa"
                    />
                  </Avatar>
                  <div>
                    <div className="font-medium">Web Qa</div>
                    <div className="text-sm text-muted-foreground">
                      @webqa13 • Last active January 2025
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    {t("members.viewBoards")} (0)
                  </Button>
                  <Button variant="ghost" size="sm">
                    {t("members.admin")}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                   {t("members.leave")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
