"use client";

import { useState } from "react";
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

const formSchema = z.object({
  title: z.string().min(1, { message: "Board title is required" }),
  workspace: z.string().min(1),
  visibility: z.string().min(1),
});
export default function WorkspaceDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      workspace: "rajalwaysfirst's workspace",
      visibility: "Workspace",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  const router = useRouter();
  return (
    <div className="bg-background">
      <header className="border-b">
        <div className="container flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600 text-white">
              R
            </div>
            <span className="font-semibold">rajahlw's workspace</span>
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
              onClick={() => router.push("/members")}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="#project-a">
            <Card className="group relative aspect-[1.5] overflow-hidden">
              <div className="bg-gray-500" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-lg font-semibold text-white">Project A</h3>
              </div>
            </Card>
          </Link>
          <Link href="#project-b">
            <Card className="group relative aspect-[1.5] overflow-hidden">
              <div className="bg-gray-500" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-lg font-semibold text-white">Project B</h3>
              </div>
            </Card>
          </Link>
          <Link href="#welcome">
            <Card className="group relative aspect-[1.5] bg-emerald-500">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  Welcome Board
                </h3>
              </div>
            </Card>
          </Link>

          {/* Sheet for Create New Board */}
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <SheetTrigger asChild>
              <Card
                className="group relative aspect-[1.5] !bg-white p-4 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex h-full flex-col items-start justify-between">
                  <h3 className="text-lg font-semibold">Create new board</h3>
                  <p className="text-sm text-muted-foreground">7 remaining</p>
                </div>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Board</h2>

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
                        <FormLabel>Board title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter board title" {...field} />
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
                        <FormLabel>Workspace</FormLabel>
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
                        <FormLabel>Visibility</FormLabel>
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
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </SheetContent>
          </Drawer>
        </div>
      </main>
    </div>
  );
}
