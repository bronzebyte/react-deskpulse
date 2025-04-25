import { TaskColumn } from "@/pages-component/taskColumn/TaskColumn";
import { Button, Card, CardBody, Form, Input } from "@heroui/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AddList = () => {
    const { t } = useTranslation();
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleAddList = (e) => {
        e.preventDefault();
        if (newListTitle.trim() === "") return;

        setLists([...lists, { id: `${Date.now()}`, title: newListTitle, tasks: [] }]);
        setNewListTitle("");
        setShowForm(false);
    };

    return (
        <div className="flex items-start gap-4 overflow-x-auto p-4">
            <TaskColumn />

            {showForm ? (
                <div className="w-72">
                    <Card className="bg-white text-black border-0">
                        <CardBody className="p-3">
                            <Form onSubmit={handleAddList} className="mt-6">
                                <div className="space-y-4">
                                    <Input
                                        type="text"
                                        name="title"
                                        variant="bordered"
                                        placeholder={t("addList.placeholder")}
                                        value={newListTitle}
                                        onChange={(e) => setNewListTitle(e.target.value)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-primary hover:bg-unset text-white"
                                            type="submit"
                                        >
                                            {t("addList.addList")}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onPress={() => setShowForm(false)}
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
                    className="w-72 justify-center bg-primary hover:bg-unset text-white"
                    onPress={() => setShowForm(true)}
                >
                    Add New List
                </Button>
            )}
        </div>
    );
};
