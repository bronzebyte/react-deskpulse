import { CommonDrawer } from "@/components/common/drawer/Drawer";
import {
    Button,
    Card,
    CardBody,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
    Textarea,
    useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import teamImage from "@/images/createTeam.png";
import {
    Bold,
    HelpCircle,
    Link2,
    List,
    MoreHorizontal,
    Plus,
    Type,
} from "lucide-react";
import { CommonModel } from "@/components/common/modal/CommonModal";
import ReactQuill from "react-quill";
import { useState } from "react";
export const TaskModel = ({ isOpen, onClose, onOpen }) => {
    const [value, setValue] = useState("");
    return (
        // <div className=" inset-0 z-50 bg-black/50 flex items-center justify-center">

        <div className="w-full flex justify-center fixed">
            <CommonModel isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
                <div className="p-6">
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
                                <h2 className="text-xl font-semibold text-gray-900">ToDo</h2>
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

                    {/* <CardContent className="space-y-6"> */}
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
                                variant="bordered"
                            />
                            <div className="p-2 text-sm text-gray-500 bg-gray-50 rounded-b-md">
                                Pro tip: Hit 'Enter' for a new paragraph, and 'Shift + Enter'
                                for a simple line break.
                            </div>
                        </div>
                        <div className="my-2">
                            <p className="font-bold text-xl">Activity</p>
                            <Tabs aria-label="Tabs radius" className="w-full" radius="none">
                                <Tab
                                    key="photos"
                                    title="All"
                                    className="border-none rounded-sm"
                                >
                                    <Card className="rounded-sm shadow-none">
                                        <CardBody className="rounded-sm shadow-none px-0">
                                            <div className="flex">
                                                <div className="flex items-start gap-2 ">
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2A3A] text-white text-sm font-semibold">
                                                        VB
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <span className="font-semibold">Vinay BB</span>{" "}
                                                            changed the{" "}
                                                            <span className="font-semibold">Status</span>
                                                            <span className="text-gray-400 text-xs">
                                                                4 hours ago
                                                            </span>
                                                            <button className="text-xs border border-gray-400 rounded px-2 py-0.5 hover:bg-gray-100">
                                                                HISTORY
                                                            </button>
                                                        </div>

                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="px-2 py-0.5 text-xs rounded border border-blue-400 text-blue-600">
                                                                IN PROGRESS
                                                            </span>
                                                            <span className="text-gray-400 text-xs">→</span>
                                                            <span className="px-2 py-0.5 text-xs rounded border border-gray-400 text-gray-600">
                                                                TO DO
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Tab>
                                <Tab title="Comments">
                                    <Card className="rounded-sm shadow-none">
                                        <CardBody className="rounded-sm shadow-none">
                                            <div>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={value}
                                                    onChange={setValue}
                                                />
                                                <div className="flex gap-3">

                                                    <Button
                                                        className=" text-white mt-3 rounded-sm hover:bg-unset"
                                                        color="secondary"
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        className="text-white mt-3 rounded-sm hover:bg-unset"
                                                        color="secondary"
                                                        onPress={onClose}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Tab>
                            </Tabs>
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
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                        </div>

                        {/* <CreateProject selectedCardId={selectedCardId} /> */}
                        {/* <GetComments selectedCardId={selectedCardId} /> */}
                    </div>
                    {/* </CardContent> */}
                </div>
            </CommonModel>
        </div>
    );
};
