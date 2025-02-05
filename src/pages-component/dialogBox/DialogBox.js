import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bold, HelpCircle, Link2, List, MoreHorizontal, Type } from "lucide-react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import * as z from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const DialogBox = ({ isDialogOpen, setIsDialogOpen, selectedCardContent }) => {
  const formSchema = z.object({
    description: z.string().min(1, { message: "Comment description is required" })
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ""
    },
  });
  async function onSubmit(data) {
    const ticketId = localStorage.getItem("ticketId");
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: data?.description

        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      } else {
        toast({ title: responseData?.message, className: "bg-[#07bc0c]" });

        form.reset();
      }
      mutate(`${API_BASE_URL}/tickets`);
    } catch (error) {
      console.log(error?.message, "error+++");
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl w-full p-4">
        <DialogDescription>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  viewBox="0 0 16 16"
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="12" height="12" rx="2" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCardContent}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                in list{" "}
                <button className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  TO DO
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <h3 className="font-medium text-gray-700">Description</h3>
              </div>

              <div className="border bg-gray-50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="sm">
                    <Type className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-4 bg-gray-200 mx-1" />
                  <Button variant="ghost" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  <div className="flex-1" />
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </div>

                <Textarea
                  placeholder="Add a description..."
                  className="border-0 focus-visible:ring-0 resize-none"
                  rows={6}
                />
                <div className="p-2 text-sm text-gray-500 bg-gray-50 rounded-b-md">
                  Pro tip: Hit 'Enter' for a new paragraph, and 'Shift +
                  Enter' for a simple line break.
                </div>
              </div>
              <div className="flex gap-6">
                <Button
                  className="bg-primary text-white mt-3 hover:bg-unset"
                  variant="ghost"
                >
                  Save
                </Button>
                <Button
                  className="bg-primary text-white mt-3 hover:bg-unset"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-medium">Activity</h3>
              </div>
              <div className="space-y-4 mt-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                    WQ
                  </div>
                  <Form {...form} className="mt-6 w-full">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Write a comment..."
                                className="flex-1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="bg-primary" type="submit">
                        Save
                      </Button>
                    </form>
                  </Form>

                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                  WQ
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Web Qa</span> added this
                    card to <span className="text-blue-600">Doing</span>
                  </p>
                  <p className="text-xs text-gray-500">21 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}