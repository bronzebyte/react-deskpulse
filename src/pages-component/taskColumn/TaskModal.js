
import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    Select,
    SelectItem,
    Tab,
    Tabs,
} from "@heroui/react";
import { CommonModel } from "@/components/common/modal/CommonModal";
import ReactQuill from "react-quill";
import { useState } from "react";
export const TaskModel = ({ isOpen, onClose, onOpen, task }) => {
    const [value, setValue] = useState("");
    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
    };

    const DetailData = [{
        title: "Due date",
        value: "None"
    }, {
        title: "Team",
        value: "None"
    }, {
        title: "Start date",
        value: "None"
    }]
    return (

        <div className="w-full flex justify-center fixed">
            <CommonModel isOpen={isOpen} onClose={onClose} onOpen={onOpen} size='5xl'>
                <div className="p-6 dark:text-white grid sm:grid-cols-2 grid-cols-1 gap-3">
                    <div>
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
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{task?.text}</h2>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                                    <Select placeholder="TODO" className="w-40">
                                        <SelectItem>IN PROGRESS</SelectItem>
                                        <SelectItem>DONE</SelectItem>

                                    </Select>

                                </div>
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center gap-2 mb-2 dark:text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <h3 className="font-medium text-gray-700 dark:text-white">Description</h3>
                            </div>

                            <div className="border bg-gray-50 dark:bg-transparent rounded-md p-4">

                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                />
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
                    </div>
                    <div className="w-full">
                        <div>
                            <Accordion itemClasses={itemClasses} showDivider={false} defaultExpandedKeys={["1"]}>
                                <AccordionItem
                                    key="1"
                                    aria-label="Connected devices" title={"Details"} className="border border-gray-300 shadow-none rounded-sm" >
                                    {DetailData?.map((item, index) => {
                                        return (
                                            <div key={index} className="grid grid-cols-2 cursor-pointer">
                                                <p className="py-2 font-bold text-[#505258] dark:text-white">{item?.title}</p>
                                                <p className="py-2 hover:bg-gray-100 font-semibold px-3 text-[#505258] dark:text-white dark:hover:bg-transparent">{item?.value}</p>

                                            </div>
                                        )
                                    })}
                                </AccordionItem>

                            </Accordion>
                            {/* <p>Details</p>
                            <Settings /> */}
                        </div>
                    </div>
                    {/* </CardContent> */}
                </div>
            </CommonModel>
        </div>
    );
};
