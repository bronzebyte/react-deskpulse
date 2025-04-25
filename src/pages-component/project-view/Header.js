import { Avatar, Card, CardBody, Input, Tab, Tabs } from "@heroui/react";
import { TaskColumn } from "../taskColumn/TaskColumn";
import { AddList } from "./addList/AddList";
import { SearchIcon, User, User2 } from "lucide-react";

export default function WorkSpaceHeader() {
  return (
    <header>
      <Tabs
        aria-label="Options"
        className="w-full"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-[#06b6d4]",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
        color="primary"
        variant="underlined"
      >
        <Tab key="photos" title="Board" className="border-none rounded-sm">
          <Card className="rounded-sm shadow-none">
            <CardBody className="rounded-sm shadow-none">
              <div >
                <div className="flex items-center">

                  <Input
                    name="search"
                    size="md"
                    className="w-[300px] px-4 rounded-none"
                    placeholder="Search Board"
                    variant="bordered"
                    startContent={
                      <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <User2 className="border border-gray rounded-full p-1 bg-gray-200" size={30} />
                  <Avatar name="BB" size="sm" className="bg-blue-800 text-white" />
                </div>
                <AddList />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Music" />
        <Tab key="videos" title="Videos" />
      </Tabs>
    </header>
  );
}
