"use client";

import { useState, useEffect } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@heroui/react";
import { Bell, HelpCircle, LogOut, Plus, Settings } from "lucide-react";
import { TbBrightnessFilled } from "react-icons/tb";
import noNotificationImage from "@/images/nonotification.png";
import Image from "next/image";
import { TeamModal } from "@/pages-component/team/TeamModel";
import { CommonDrawer } from "../drawer/Drawer";
import darkModeImage from "@/images/nightMode.png"
import lightModeImage from "@/images/lightMode.png"
import { useRouter } from "next/navigation";
import ProtectedComponent from "../ProtectedComponent/ProtectedComponent";
export default function Header() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isSettingsOpen,
    onOpen: openSettingsDrawer,
    onClose: closeSettingsDrawer,
  } = useDisclosure();
  const { isOpen: isTeamOpen, onOpen: openTeamModal, onClose: closeTeamModal } = useDisclosure();


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkTheme]);

  const handleOpen = (title) => {
    if (title === "notification") {
      onOpen();
    } else {
      openSettingsDrawer();
    }
  };
  const router = useRouter()
  return (
    <nav className=" items-center px-4 h-12 bg-white border-b sticky top-0 z-10 dark:bg-gray-900 flex justify-between">

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600 text-white">
            B
          </div>
        </div>
      </div>
      <ProtectedComponent >
        <TeamModal isOpen={isTeamOpen} onOpen={openTeamModal} onClose={closeTeamModal} />
      </ProtectedComponent>
      <ProtectedComponent fallback={
        <div className="space-x-4 flex">
          <Button onPress={() => router.push("/sign-in")} color="secondary" className="rounded-sm">Sign In</Button>
          <Button onPress={() => router.push("/sign-up")} color="secondary" className="rounded-sm">Sign Up</Button>
        </div>
      } />

      <ProtectedComponent >
        <div className="flex items-center gap-2 ml-auto ml-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onPress={() => handleOpen("notification")}
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onPress={() => handleOpen("setting")}
          >
            <Settings className="h-4 w-4" />
          </Button>

          <CommonDrawer
            isOpen={isOpen}
            onClose={onClose}
            backdrop="transparent"
            className="h-[95dvh]"
          >
            <div className="flex flex-col justify-center items-center w-full">
              <Image src={noNotificationImage} className="m-4" />
              <p className="text-center mt-5 ">
                You have no notifications from the last 30 days.
              </p>
            </div>
          </CommonDrawer>
          <div className="dark:text-white">

            <CommonDrawer
              isOpen={isSettingsOpen}
              onClose={closeSettingsDrawer}
              backdrop="transparent"
              className="h-fit dark:text-white"
              size="sm"
              title="Settings"
            >
              <div className="flex items-center space-x-2 bg-[#F8F8F8] dark:bg-[#18181B] py-6 px-2 rounded-sm">
                <div className="flex h-20 w-20  items-center text-3xl justify-center rounded-full bg-blue-900 text-white dark:bg-black font-bold">
                  BB
                </div>
                <div className="text-top">
                  <div className="text-xl text-blue-600">Bronze Byte</div>
                  <div className="text-xs text-gray-500">BronzeByte@gmail.com</div>
                </div>
              </div>

              <div className="flex gap-2 p-3 hover:bg-gray-100 my-2 cursor-pointer dark:hover:bg-transparent dark:text-white">
                <LogOut />
                <p >Log Out</p>
              </div>

              <div className="flex items-center gap-2 p-3 hover:bg-gray-100 my-2 cursor-pointer dark:hover:bg-transparent">
                <div className="relative w-full">
                  <Popover placement="left">
                    <PopoverTrigger className="w-full">
                      <Button className="bg-unset shadow-none p-0 w-full justify-start" >
                        <TbBrightnessFilled size={30} /> Theme
                      </Button>

                    </PopoverTrigger>
                    <PopoverContent className="my-6 relative right-8">
                      <div className="flex gap-2 border-b border-b-gray py-2 cursor-pointer">

                        <Image src={darkModeImage} /> <p onClick={() => setIsDarkTheme(true)} className="w-[200px] py-5 cursor-pointer ">Dark Theme</p>
                      </div>
                      <div className="flex gap-2 py-2 cursor-pointer">
                        <Image src={lightModeImage} />
                        <p onClick={() => setIsDarkTheme(false)} className="w-[200px] py-5 cursor-pointer ">Light Theme</p>
                      </div>
                    </PopoverContent>
                  </Popover>

                </div>

              </div>
            </CommonDrawer>
          </div>
        </div>
      </ProtectedComponent>

    </nav>
  );
}
