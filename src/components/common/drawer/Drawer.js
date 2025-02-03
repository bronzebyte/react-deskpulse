import { Sheet } from "@/components/ui/sheet"

export const Drawer=({children,isOpen,setIsOpen})=>{
    return(
        <Sheet open={isOpen} onOpenChange={setIsOpen} className="!bg-white">
       {children}
      </Sheet>
    )
}