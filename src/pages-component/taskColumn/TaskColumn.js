import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, X, Edit } from "lucide-react";
import { DialogBox } from "@/pages-component/dialogBox/DialogBox";

export const TaskColumn = ({ columns, setColumns }) => {
  const [addingCardForColumnId, setAddingCardForColumnId] = useState(null);
  const [newCardContent, setNewCardContent] = useState("");
  const [editingCardId, setEditingCardId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const [draggingTask, setDraggingTask] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState("");
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
                    <Input
                      type="text"
                      className="mb-2"
                      value={newCardContent}
                      onChange={(e) => setNewCardContent(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && addNewCard(columnId)
                      }
                    />
                  </div>
                  <Button
                    onClick={() => addNewCard(columnId)}
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
