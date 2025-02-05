import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, X, Edit } from "lucide-react";
import { DialogBox } from "@/pages-component/dialogBox/DialogBox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
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
export const TaskColumn = ({ columns, setColumns }) => {
    const router = useRouter();
      const { projectId } = router.query;

  const [addingCardForColumnId, setAddingCardForColumnId] = useState(null);
  const [newCardContent, setNewCardContent] = useState("");
  const [editingCardId, setEditingCardId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const [draggingTask, setDraggingTask] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState("");
  const { data, error, isLoading } = useSWR(`${API_BASE_URL}/projects/${projectId}`, fetcher);
  const formSchema = z.object({
    title: z.string().min(1, { message: "List title is required" }),
    description: z.string().min(1, { message: "List description is required" })
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  });
  async function onSubmit(data, columnId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data?.title,
          description: data?.description,
          projectId,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast({
          title: responseData?.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Project Ticket has been created successfully", className: "bg-[#07bc0c]" });
        setColumns((prevColumns) => ({
          ...prevColumns,
          [columnId]: {
            ...prevColumns[columnId],
            tasks: [
              ...prevColumns[columnId].tasks,
              { id: responseData._id, content: data.title },
            ],
          },
        }));
        localStorage.setItem("ticketId", responseData?._id)
        form.reset();
        setAddingCardForColumnId(null)
      }
      mutate(`${API_BASE_URL}/tickets`);
    } catch (error) {
      console.log(error?.message, "error+++");
    }
  }

  const handleCancel = () => {
    setNewCardContent("");
    setAddingCardForColumnId(null);
  };

  const handleEditCard = (columnId, cardId) => {
    setEditingCardId(cardId);
    const cardToEdit = columns[columnId].tasks.find(
      (task) => task.id === cardId
    );
    setEditingContent(cardToEdit.content);
  };

  const saveCard = (columnId, cardId) => {
    if (editingContent.trim()) {
      setColumns((prevColumns) => {
        const updatedTasks = prevColumns[columnId].tasks.map((task) =>
          task.id === cardId
            ? { ...task, content: editingContent, isEditing: false }
            : task
        );
        return {
          ...prevColumns,
          [columnId]: { ...prevColumns[columnId], tasks: updatedTasks },
        };
      });
      setEditingCardId(null);
      setEditingContent("");
    }
  };

  const openDialog = (taskContent) => {
    setSelectedCardContent(taskContent);
    setIsDialogOpen(true);
  };

  const addNewCard = (columnId) => {
    if (newCardContent.trim()) {
      const newCard = {
        id: Date.now().toString(),
        content: newCardContent,
      };
      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          tasks: [...columns[columnId].tasks, newCard],
        },
      });
      setNewCardContent("");
      setAddingCardForColumnId(null);
    }
  };

  const handleDragStart = (task, columnId) => {
    setDraggingTask({ task, columnId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (targetColumnId) => {
    if (!draggingTask) return;
    const { task, columnId } = draggingTask;

    if (columnId !== targetColumnId) {
      setColumns((prev) => {
        const sourceTasks = prev[columnId].tasks.filter(
          (t) => t.id !== task.id
        );
        const targetTasks = [...prev[targetColumnId].tasks, task];

        return {
          ...prev,
          [columnId]: { ...prev[columnId], tasks: sourceTasks },
          [targetColumnId]: { ...prev[targetColumnId], tasks: targetTasks },
        };
      });
    }
    setDraggingTask(null);
  };

  return (
    <>
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          className="w-72"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(columnId)}
        >
          <Card className="bg-white text-black border-0">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium">{column.title}</h2>
              </div>

              <div className="space-y-2 text-black">
                {column.tasks.map((task) => (
                  <div key={task.id}>
                    <Card className="bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-colors">
                      <div className="p-2">
                        {editingCardId === task.id ? (
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={editingContent}
                              onChange={(e) =>
                                setEditingContent(e.target.value)
                              }
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => saveCard(columnId, task.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="flex justify-between items-center cursor-pointer bg-white"
                            onDragStart={() => handleDragStart(task, columnId)}
                            draggable
                          >
                            <p onClick={() => openDialog(task.content)} className="w-full">
                              {task.content}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCard(columnId, task.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {addingCardForColumnId === columnId ? (
                <>
                  <div className="flex gap-2 mt-2">
                    <Form {...form} className="mt-6">
                      <form onSubmit={form.handleSubmit((data) => onSubmit(data, columnId))} className="space-y-6">
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
                        <FormField
                          control={form.control}
                          name="description"
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
                        <Button
                          type="submit"
                          size="sm"
                          className="bg-primary hover:bg-unset"
                        >
                          Add card
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-black hover:bg-unset"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  </div>

                </>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 hover:bg-white/10 mt-2"
                  onClick={() => setAddingCardForColumnId(columnId)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add a card
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
      <DialogBox
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedCardContent={selectedCardContent}
      />
    </>
  );
};
