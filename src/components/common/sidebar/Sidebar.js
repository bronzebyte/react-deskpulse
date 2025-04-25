import { ChevronLeft, Hash } from "lucide-react";
import { TbDeviceMobile } from "react-icons/tb";
import { CommonModel } from "../modal/CommonModal";
import { Button, Form, Input, Select, SelectItem, Textarea, useDisclosure } from "@heroui/react";

export default function Sidebar() {
  const boards = [
    { id: "1", name: "asdasd" },
    { id: "2", name: "sdfsdf" },
    { id: "3", name: "Wow" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col w-64 h-[calc(100vh-50px)] ">
      <div className="flex items-center justify-between p-2 border-b border-r border-[#2D2A33]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8  bg-pink-600 rounded">
            B
          </div>
          <span className="font-semibold ">BronzeByte</span>
        </div>
        <button>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 border-r border-[#2D2A33]">
        <div className="px-3 py-2">
          <h2 className="px-1 text-sm font-semibold ">Your boards</h2>
        </div>
        {/* <ScrollArea className="flex-1"> */}
        <p
          className="px-4 py-2 text-gray-800 flex items-center gap-3 cursor-pointer"
          onClick={onOpen}
        >
          <TbDeviceMobile />
          Projects
        </p>
        <div className="space-y-[2px]">
          {boards.map((board) => (
            <button
              key={board.id}
              className="flex items-center w-full gap-2 px-4 py-2 text-sm   focus:outline-none"
            >
              <Hash className="w-4 h-4 " />
              <span>{board.name}</span>
            </button>
          ))}
        </div>
        <CommonModel
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          title={"Add project details"}
        >
          <div className="p-5 ">
            <p className="w-4/5">
              Explore what's possible when you collaborate with your team. Edit
              project details anytime in project settings.
            </p>
            <p>
              Required fields are marked with an asterisk
              <span className="text-red-500">* </span>
            </p>
          </div>
          <Form className="w-full">
            <div className="px-5 my-2 w-full">
              <Input
                name="projectTitle"
                isRequired
                label="Name"
                variant="bordered"
              />
              <Textarea
                name="description"
                className="py-5"
                isRequired
                label="Description"
                variant="bordered"
              />
              <Select
                className="pb-5"
                placeholder="Select Workspace"
                variant="bordered"
                isRequired
              >
                <SelectItem>Frontend</SelectItem>
                <SelectItem>Backend</SelectItem>
                <SelectItem>Full Stack</SelectItem>


              </Select>
            </div>
            <div className="flex justify-end gap-3 p-5 w-full">
              <Button variant="plain" onPress={onClose}>
                Cancel
              </Button>
              <Button color="secondary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </CommonModel>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
