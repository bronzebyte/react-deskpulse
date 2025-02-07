import { useForm } from "react-hook-form";
import { mutate } from "swr";
import * as z from "zod";
import { useTranslation } from "next-i18next";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function CreateProject({ selectedCardId }) {
  const { t } = useTranslation();

  const formSchema = z.object({
    description: z
      .string()
      .min(1, { message: t("createComment.commentDescriptionRequired") }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });
  async function onSubmit(data) {
    const refetchData = () => {
      mutate(`/tickets/${selectedCardId}/comments`);
    };

    try {
      const response = await api.post(`/tickets/${selectedCardId}/comments`, {
        description: data?.description,
      });

      const responseData = response.data;
      if (responseData) {
        toast({ title: responseData?.message, className: "bg-[#07bc0c]" });

        form.reset();
        refetchData();
      } else {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error?.message, "error+++");
    }
  }
  return (
    <>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-primary mt-2 text-white" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
