import { TaskModel } from "@/pages-component/taskColumn/TaskModal";
import { Button, Card, CardBody, Form, Input } from "@heroui/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AddList = () => {
    const { t } = useTranslation();
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [cardInputs, setCardInputs] = useState({});
    const [showCardInput, setShowCardInput] = useState({});
    const [dragData, setDragData] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleAddList = (e) => {
        e.preventDefault();
        if (newListTitle.trim() === "") return;

        const newList = {
            id: `${Date.now()}`,
            title: newListTitle,
            tasks: []
        };

        setLists([...lists, newList]);
        setNewListTitle("");
        setShowForm(false);
    };

    const handleCardInputChange = (listId, value) => {
        setCardInputs((prev) => ({ ...prev, [listId]: value }));
    };

    const handleAddCard = (listId) => {
        const text = cardInputs[listId]?.trim();
        if (!text) return;

        setLists((prev) =>
            prev.map((list) =>
                list.id === listId
                    ? {
                        ...list,
                        tasks: [...list.tasks, { id: `${Date.now()}`, text }]
                    }
                    : list
            )
        );

        setCardInputs((prev) => ({ ...prev, [listId]: "" }));
        setShowCardInput((prev) => ({ ...prev, [listId]: false }));
    };

    const toggleCardInput = (listId) => {
        setShowCardInput((prev) => ({
            ...prev,
            [listId]: !prev[listId]
        }));
    };

    const handleDragStart = (listId, taskId) => {
        setDragData({ fromListId: listId, taskId });
    };

    const handleDrop = (toListId) => {
        if (!dragData) return;
        const { fromListId, taskId } = dragData;

        if (fromListId === toListId) return;

        const taskToMove = lists
            .find((list) => list.id === fromListId)
            .tasks.find((task) => task.id === taskId);

        if (!taskToMove) return;

        setLists((prevLists) =>
            prevLists.map((list) => {
                if (list.id === fromListId) {
                    return {
                        ...list,
                        tasks: list.tasks.filter((task) => task.id !== taskId)
                    };
                } else if (list.id === toListId) {
                    return {
                        ...list,
                        tasks: [...list.tasks, taskToMove]
                    };
                }
                return list;
            })
        );

        setDragData(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="flex items-start gap-4 overflow-x-auto p-4">
                {lists.map((list) => (
                    <div
                        key={list.id}
                        className="w-72 shrink-0 h-[calc(100vh-200px)]"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(list.id)}
                    >
                        <Card className="bg-white text-black border-0">
                            <CardBody className="p-4">
                                <h3 className="text-lg font-semibold">{list.title}</h3>

                                <div className="space-y-2">
                                    {list.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="bg-gray-100 p-2 rounded cursor-pointer"
                                            draggable
                                            onDragStart={() =>
                                                handleDragStart(list.id, task.id)
                                            }
                                            onClick={() => setSelectedTask(task)}
                                        >
                                            {task.text}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-2 h-full">
                                    {showCardInput[list.id] ? (
                                        <Form>
                                            <Input
                                                isRequired
                                                placeholder="Add Card"
                                                autoFocus
                                                value={cardInputs[list.id] || ""}
                                                onChange={(e) =>
                                                    handleCardInputChange(list.id, e.target.value)
                                                }
                                                variant="bordered"
                                            />
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className="bg-primary text-white"
                                                    onPress={() => handleAddCard(list.id)}
                                                >
                                                    Add Card
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onPress={() => toggleCardInput(list.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Form>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="mt-2 text-primary"
                                            onPress={() => toggleCardInput(list.id)}
                                        >
                                            + Add Card
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}

                {showForm ? (
                    <div className="w-72 shrink-0 ">
                        <Card className="bg-white text-black border-0">
                            <CardBody className="p-3">
                                <Form onSubmit={handleAddList} className="mt-2">
                                    <div className="space-y-4">
                                        <Input
                                            type="text"
                                            isRequired
                                            autoFocus
                                            name="title"
                                            variant="bordered"
                                            placeholder="Enter list title"
                                            value={newListTitle}
                                            onChange={(e) => setNewListTitle(e.target.value)}
                                        />
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-primary text-white"
                                                type="submit"
                                            >
                                                Add List
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onPress={() => setShowForm(false)}
                                                className="dark:bg-black"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <Button
                        size="sm"
                        className="w-72 shrink-0 justify-center bg-primary text-white"
                        onPress={() => setShowForm(true)}
                    >
                        {t("addList.addNewList") || "Add New List"}
                    </Button>
                )}
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
