import { Button } from "@/components/ui/button"
import { LayoutGrid, Settings, Users } from "lucide-react"
import { TeamDrawerForm } from "../teamDrawerForm/TeamDraweForm"

export const TeamHeader=({item})=>{
    return(
        <>
        
        <header className="border-b">
                  <div className="container flex h-14 items-center px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600 text-white">
                        {item?.title?.toUpperCase()?.slice(0, 1)}
                      </div>
                      <span className="font-semibold">{item?.title}</span>
                    </div>
                    <nav className="ml-auto flex items-center gap-2">
                      <Button variant="ghost" className="gap-2">
                        <LayoutGrid className="h-4 w-4" />
                        Boards
                      </Button>
                      <Button variant="ghost">Views</Button>
                      <Button
                        variant="ghost"
                        className="gap-2"
                        onClick={() => router.push(`/members/${item?._id}`)}
                      >
                        <Users className="h-4 w-4" />
                        Members (1)
                      </Button>
                      <Button
                        variant="ghost"
                        className="gap-2"
                      >
                        <Settings className="h-4 w-4" />

                        <TeamDrawerForm
                          teamId={item?._id}
                          value={item?.title}
                          title={"Settings"}
                          method="PUT"
                        />
                      </Button>
                      <Button variant="outline" className="ml-2">
                        Upgrade
                      </Button>
                    </nav>
                  </div>
                </header>
        </>
    )
}