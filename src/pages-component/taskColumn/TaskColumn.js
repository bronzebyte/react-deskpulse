import { useState } from "react";
import { Button, Card, CardBody, Form, Input } from "@heroui/react";
import { Plus, X } from "lucide-react";
import { useTranslation } from "next-i18next";
import { TaskModel } from "./TaskModal";

export const TaskColumn = () => {
  const { t } = useTranslation();

  const [columns] = useState([
    { _id: "col-1", title: "To Do" },
    { _id: "col-2", title: "In Progress" },
    { _id: "col-3", title: "Done" },
  ]);

  const [ticketData, setTicketData] = useState({
    tickets: [
      { _id: "1", title: "Task A", listId: "col-1" },
      { _id: "2", title: "Task B", listId: "col-2" },
      { _id: "3", title: "Task C", listId: "col-1" },
    ],
  });

  const [addingCardForColumnId, setAddingCardForColumnId] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragStart = (e, ticketId) => {
    e.dataTransfer.setData("ticketId", ticketId);
  };

  const handleDrop = (e, targetListId) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");

    setTicketData((prev) => ({
      tickets: prev.tickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, listId: targetListId } : ticket
      ),
    }));
  };

  const handleAddCard = (columnId) => {
    if (!newCardTitle.trim()) return;

    const newCard = {
      _id: `${Date.now()}`,
      title: newCardTitle,
      listId: columnId,
    };

    setTicketData((prev) => ({
      tickets: [...prev.tickets, newCard],
    }));

    setNewCardTitle("");
    setAddingCardForColumnId(null);
  };

  return (
    <>
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {columns.map((column) => (
          <div
            key={column._id}
            className="w-72"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column._id)}
          >
            <Card className="bg-white text-black border-0">
              <CardBody className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium">{column.title}</h2>
                </div>

                <div className="space-y-2 text-black">
                  {ticketData?.tickets
                    ?.filter((task) => task?.listId === column?._id)
                    ?.map((task) => (
                      <Card
                        key={task._id}
                        className="bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-colors"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task._id)}
                      >
                        <div className="p-2">
                          <div
                            className="flex justify-between items-center cursor-pointer bg-white"
                            onClick={() => setSelectedTask(task)}
                          >
                            <p className="w-full">{task.title}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>

                {addingCardForColumnId === column._id ? (
                  <div className="mt-3 space-y-2">
                    <Form>
                      <Input
                        type="text"
                        value={newCardTitle}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                        placeholder="Card title"
                        variant="bordered"
                        isRequired
                      />
                      <div className="w-full flex justify-between">
                        <Button
                          onPress={() => handleAddCard(column._id)}
                          size="sm"
                          type="submit"
                          className="bg-primary text-white hover:bg-primary-dark"
                        >
                          Add Card
                        </Button>
                        <Button
                          onPress={() => setAddingCardForColumnId(null)}
                          variant="ghost"
                          size="sm"
                          className="text-black hover:bg-gray-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <Button
                    onPress={() => setAddingCardForColumnId(column._id)}
                    variant="ghost"
                    className="w-full justify-start text-sm h-8 hover:bg-white/10 mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" /> {t("tickets.addACard") || "Add a card"}
                  </Button>
                )}
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskModel
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
};
