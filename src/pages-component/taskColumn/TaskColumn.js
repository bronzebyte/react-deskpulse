import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { DialogBox } from "@/pages-component/dialogBox/DialogBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import fetcher from "@/lib/fetcher";
import api from "@/lib/api";
import { useTranslation } from "next-i18next";

export const TaskColumn = ({ columns }) => {
  const router = useRouter();
  const { projectId } = router.query;
  const [addingCardForColumnId, setAddingCardForColumnId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardContent, setSelectedCardContent] = useState("");
  const [ticketData, setTicketData] = useState([]);
  const { t } = useTranslation();

  const {
    data: fetchTicketData,
    error,
    isLoading,
  } = useSWR(projectId ? `/tickets/project/${projectId}` : null, fetcher);

  const formSchema = z.object({
    title: z.string().min(1, { message: t("tickets.listTitleRequired") }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    setTicketData(fetchTicketData);
  }, [fetchTicketData]);
  async function onSubmit(data, columnId) {
    const refetchData = () => {
      mutate(`/tickets/project/${projectId}`);
    };
    try {
      const response = await api.post(`/tickets`, {
        title: data?.title,
        projectId,
        listId: columnId,
      });

      const responseData = await response.data;
      if (responseData) {
        toast({
          title: t("tickets.ticketCreated"),
          className: "bg-[#07bc0c]",
        });

        form.reset();
        setAddingCardForColumnId(null);
        refetchData();
      } else {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      }
      mutate(`/tickets`);
    } catch (error) {
      console.log(error?.message, "error+++");
    }
  }

  const openDialog = (taskContent, taskId) => {
    setSelectedCardContent(taskContent);
    setSelectedCardId(taskId);
  };

  const closeDialog = () => {
    setSelectedCardId(null);
  };
  const handleDragStart = (e, ticketId) => {
    e.dataTransfer.setData("ticketId", ticketId);
  };

  const handleDrop = (e, targetListId) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");
    setTicketData((prevTickets) => ({
      ...prevTickets,
      tickets:
        prevTickets?.tickets?.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, listId: targetListId } : ticket
        ) || [],
    }));
  };

  return (
    <>
      {columns?.lists?.map((column, index) => (
        <div
          key={column._id}
          className="w-72"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, column._id)}
        >
          <Card className="bg-white text-black border-0">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium">{column.title}</h2>
              </div>

              <div className="space-y-2 text-black">
                {ticketData?.tickets
                  ?.filter((task) => task?.listId === column?._id)
                  ?.map((task) => (
                    <div key={task._id}>
                      <Card
                        className="bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-colors"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task._id)}
                      >
                        <div className="p-2">
                          <div className="flex justify-between items-center cursor-pointer bg-white">
                            <p
                              onClick={() => openDialog(task.title, task?._id)}
                              className="w-full"
                            >
                              {task.title}
                            </p>
                          </div>
                        </div>
                      </Card>
                      <div>
                        {selectedCardId === task._id && (
                          <DialogBox
                            isDialogOpen={selectedCardId !== null}
                            setIsDialogOpen={closeDialog}
                            selectedCardContent={selectedCardContent}
                            selectedCardId={selectedCardId}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {addingCardForColumnId === column?._id ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) =>
                      onSubmit(data, column?._id)
                    )}
                    className="space-y-2 mt-2"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter card title"
                              className="mb-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between">
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-primary text-white hover:bg-primary-dark"
                      >
                        {t("tickets.addCardBtnText")}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-black hover:bg-gray-200"
                        onClick={() => setAddingCardForColumnId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 hover:bg-white/10 mt-2"
                  onClick={() => setAddingCardForColumnId(column?._id)}
                >
                  <Plus className="h-4 w-4 mr-1" /> {t("tickets.addACard")}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};
