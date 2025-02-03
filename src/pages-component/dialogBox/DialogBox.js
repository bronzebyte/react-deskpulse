import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bold, HelpCircle, Link2, List, MoreHorizontal, Type } from "lucide-react"

export const DialogBox=({isDialogOpen,setIsDialogOpen,selectedCardContent})=>{
    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl w-full p-4">
          <DialogDescription>
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
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedCardContent}
                  </h2>
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

            <CardContent className="space-y-6">
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
                  />
                  <div className="p-2 text-sm text-gray-500 bg-gray-50 rounded-b-md">
                    Pro tip: Hit 'Enter' for a new paragraph, and 'Shift +
                    Enter' for a simple line break.
                  </div>
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
                  >
                    Cancel
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium">Activity</h3>
                </div>
                <div className="space-y-4 mt-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                      WQ
                    </div>
                    <Input
                      placeholder="Write a comment..."
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                    WQ
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Web Qa</span> added this
                      card to <span className="text-blue-600">Doing</span>
                    </p>
                    <p className="text-xs text-gray-500">21 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
}