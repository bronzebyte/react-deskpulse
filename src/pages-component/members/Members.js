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
const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});
export default function Members() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
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
                <DialogTitle>Invite to workspace</DialogTitle>
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
                        <FormLabel>Board title</FormLabel>
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
                    <p>Invite someone to this workspace with a link:</p>
                    <Button type="submit" className="bg-primary">
                      Copy Link
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
                Workspace members (1)
              </h2>
              <p className="text-muted-foreground">
                Workspace members can view and join all Workspace visible boards
                and create new boards in the Workspace.
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
                    View boards (0)
                  </Button>
                  <Button variant="ghost" size="sm">
                    Admin
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                    Leave...
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
