import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Hash } from "lucide-react"



export default function Sidebar() {
  const boards = [
    { id: "1", name: "asdasd" },
    { id: "2", name: "sdfsdf" },
    { id: "3", name: "Wow" },
  ]

  return (
    <div className="flex flex-col w-64 h-screen bg-[#1E1B22]">
      <div className="flex items-center justify-between p-4 border-b border-[#2D2A33]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-pink-600 rounded">B</div>
          <span className="font-semibold text-white">BronzeByte</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1">
        <div className="px-3 py-2">
          <h2 className="px-1 text-sm font-semibold text-gray-400">Your boards</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-[2px]">
            {boards.map((board) => (
              <button
                key={board.id}
                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-[#2D2A33] focus:outline-none"
              >
                <Hash className="w-4 h-4 text-gray-500" />
                <span>{board.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

