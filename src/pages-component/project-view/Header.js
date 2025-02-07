import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import fetcher from "@/lib/fetcher";
import {
  ChevronDown,
  Filter,
  LayoutGrid,
  MoreHorizontal,
  Share2,
  Star,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function WorkSpaceHeader() {
  const [membersData, setMembersData] = useState([]);
  const { data, error, isLoading } = useSWR(`/members`, fetcher);

  useEffect(() => {
    setMembersData(data);
  }, [data]);

  console.log(membersData, "membersDatamembersData");
  return (
    <header className="flex h-12 items-center justify-between border-b bg-[#1D2125] px-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-white">sdfsdf</span>
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-white">
          <Star className="h-4 w-4" />
          <span className="text-sm">Workspace visible</span>
        </Button>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-2 bg-white/10 px-3 text-white hover:bg-white/20"
              >
                <LayoutGrid className="h-4 w-4" />
                Board
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>Board view</DropdownMenuItem>
              <DropdownMenuItem>Timeline view</DropdownMenuItem>
              <DropdownMenuItem>Calendar view</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-white hover:bg-white/10"
        >
          <Zap className="h-4 w-4" />
          Power-Ups
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-white hover:bg-white/10"
        >
          <Zap className="h-4 w-4" />
          Automation
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-white hover:bg-white/10"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-white text-black"></PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="mx-2 h-5 bg-white/20" />
        <div className="flex h-8 items-center rounded bg-white/10 px-3 text-sm text-white">
          W3
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-white hover:bg-white/10"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/10"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
