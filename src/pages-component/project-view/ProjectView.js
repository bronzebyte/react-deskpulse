import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { TaskColumn } from "@/pages-component/taskColumn/TaskColumn";
const initialColumns = {
  todo: { title: "To Do", tasks: [] },
  doing: { title: "Doing", tasks: [] },
  done: { title: "Done", tasks: [] },
};

export default function ProjectView() {
  const [columns, setColumns] = useState(initialColumns);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const addNewList = () => {
    if (newListTitle.trim()) {
      const newId = Date.now().toString();
      setColumns({
        ...columns,
        [newId]: { title: newListTitle, tasks: [] },
      });
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  return (
    <div
      className="flex gap-4 p-4 overflow-x-auto min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgb(13, 17, 23) 0%, rgb(88, 130, 80) 100%)",
      }}
    >
      <TaskColumn columns={columns} setColumns={setColumns} />
      {isAddingList ? (
        <div className="w-72">
          <Card className="bg-white text-black border-0">
            <CardContent className="p-3">
              <Input
                type="text"
                className="mb-2"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNewList()}
              />
              <Button
                onClick={addNewList}
                size="sm"
                className="bg-primary hover:bg-unset"
              >
                Add List
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingList(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Button
          // variant="ghost"
          size="sm"
          className="w-72 justify-center bg-primary hover:bg-unset"
          onClick={() => setIsAddingList(true)}
        >
          Add a new list
        </Button>
      )}
    </div>
  );
}
