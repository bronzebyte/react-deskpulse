import { Grid, Home, LayoutGrid } from "lucide-react"
import Link from "next/link"

export const Sidebar=()=>{
    return(
        <div className="w-64 border-r bg-background p-4">
        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-blue-600"
          >
            <Grid className="h-5 w-5" />
            <span>Boards</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutGrid className="h-5 w-5" />
            <span>Templates</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>

          <div className="pt-4">
            <h3 className="px-3 text-sm font-medium text-gray-500">
              Workspaces
            </h3>
            <Link
              href="#"
              className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs font-medium text-white">
                M
              </div>
              <span>MYRQM</span>
            </Link>
          </div>
        </nav>
      </div>
    )
}