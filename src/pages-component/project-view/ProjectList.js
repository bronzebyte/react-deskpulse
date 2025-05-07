"use client";

import {
    Button,
    Checkbox,
    cn,
    Form,
    Input,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TaskModel } from "../taskColumn/TaskModal";

export const ProjectListView = () => {
    const [showCreateInput, setShowCreateInput] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [tasks, setTasks] = useState([
        {
            id: 1,
            type: "task",
            key: "KAN-2",
            summary: "hrthrthrth",
            status: "TO DO",
            comments: 0,
            assignee: null,
            dueDate: null,
            labels: "11",
            created: "24 Apr 2025",
            isSelected: false,
            isExpanded: false,
        },
        {
            id: 2,
            type: "task",
            key: "KAN-1",
            summary: "wefhqghwef",
            status: "TO DO",
            comments: 0,
            assignee: null,
            dueDate: null,
            labels: "11",
            created: "24 Apr 2025",
            isSelected: false,
            isExpanded: true,
        },
        {
            id: 3,
            type: "bug",
            key: "KAN-5",
            summary: "new task",
            status: "TO DO",
            comments: 0,
            assignee: {
                name: "Vinay BB",
                avatar: "/placeholder.svg?height=32&width=32",
            },
            dueDate: null,
            labels: "11",
            created: "25 Apr 2025",
            isSelected: false,
            isExpanded: true,
        },
    ]);

    const createTask = () => {
        setShowCreateInput(false)
    }

    return (
        <div className="w-full border border-gray-200  ">
            <Table aria-label="Example empty table cursor-pointer shadow-none">
                <TableHeader className="cursor-pointer ">

                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Key
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Summary
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Status
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Comments
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Assignee
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Due date
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Labels
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Created Y
                    </TableColumn>
                    <TableColumn className="p-2 text-left font-medium text-gray-600">
                        Created
                    </TableColumn><TableColumn className="p-2 text-left font-medium text-gray-600">
                        Created
                    </TableColumn>
                    <TableColumn className="w-10 p-2">
                        <button className="text-gray-500 hover:text-gray-700">
                            <Plus className="w-4 h-4" />
                        </button>
                    </TableColumn>
                    {/* </tr> */}
                </TableHeader>
                <TableBody className="rounded-sm">
                    {tasks.map((task) => (
                        <TableRow key="1">
                            <TableCell className="cursor-pointer" onClick={() => setSelectedTask(task)}>{task?.key}</TableCell>
                            <TableCell className="cursor-pointer">{task?.key}</TableCell>
                            <TableCell className="cursor-pointer">{task?.summary}</TableCell>
                            <TableCell className="cursor-pointer">{task?.status}</TableCell>
                            <TableCell className="cursor-pointer">{task?.comments}</TableCell>
                            <TableCell className="cursor-pointer">{task?.assignee?.name}</TableCell>
                            <TableCell className="cursor-pointer">{task?.dueDate}</TableCell>
                            <TableCell className="cursor-pointer">{task?.labels}</TableCell>
                            <TableCell className="cursor-pointer">{task?.created}</TableCell>
                            <TableCell className="cursor-pointer">{task?.labels}</TableCell>
                            <TableCell className="cursor-pointer">{task?.created}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="bg-gray-50 p-2 border-t border-gray-200 flex items-center">
                {showCreateInput ? (
                    <Form className="w-full" onSubmit={createTask}>
                        <div className="flex items-center w-full gap-2">
                            <Select className="w-40" defaultSelectedKeys={["team"]}>
                                <SelectItem key="team">
                                    Team
                                </SelectItem>
                                <SelectItem key="epic">
                                    Epic
                                </SelectItem>
                            </Select>
                            <Input

                                placeholder="Enter task summary"
                                className="flex-1 rounded-none bg-white"
                                variant="bordered"
                                isRequired

                            />
                            <Button
                                type="submit"
                                className="rounded-none"
                                color="primary"

                            >
                                Add
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <Button
                        className="flex items-center rounded-none w-full text-sm font-medium"
                        color="white"
                        onPress={() => setShowCreateInput(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create
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
        </div>
    );
};
