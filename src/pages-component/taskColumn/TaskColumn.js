import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Plus, X } from "lucide-react"
import { DialogBox } from "@/pages-component/dialogBox/DialogBox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const fetcher = (url) => {
  const token = Cookies.get('token')
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const TaskColumn = ({ columns, setColumns }) => {
  const token = Cookies.get('token')

  const router = useRouter()
  const { projectId } = router.query
  const [addingCardForColumnId, setAddingCardForColumnId] = useState(null)
  const [editingCardId, setEditingCardId] = useState(null)
  const [editingContent, setEditingContent] = useState("")
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [draggingTask, setDraggingTask] = useState(null)
  const [draggingColumnIndex, setDraggingColumnIndex] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCardContent, setSelectedCardContent] = useState("")
  const [ticketData,setTicketData]=useState([])
  const { data: fetchTicketData, error, isLoading } = useSWR(projectId ?`${API_BASE_URL}/tickets/project/${projectId}`:null,
    fetcher
  );

  const formSchema = z.object({
    title: z.string().min(1, { message: "List title is required" }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
useEffect(()=>{
  setTicketData(fetchTicketData)
},[fetchTicketData])
  async function onSubmit(data, columnId) {
    const token = Cookies.get('token')
    const refetchData = () => {
      mutate(`${API_BASE_URL}/tickets/project/${projectId}`);
    };
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data?.title,
          projectId,
          listId: columnId
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        toast({
          title: responseData?.message,
          variant: "destructive",
        })
      } else {
        toast({ title: "Project Ticket has been created successfully", className: "bg-[#07bc0c]" })
        
        form.reset()
        setAddingCardForColumnId(null)
        refetchData()
      }
      mutate(`${API_BASE_URL}/tickets`)
    } catch (error) {
      console.log(error?.message, "error+++")
    }
  }

  const handleEditCard = (columnId, cardId) => {
    setEditingCardId(cardId)
    const cardToEdit = columns[columnId].tasks.find((task) => task.id === cardId)
    setEditingContent(cardToEdit.content)
  }

  const saveCard = (columnId, cardId) => {
    if (editingContent.trim()) {
      setEditingCardId(null)
      setEditingContent("")
    }
  }

  const handleDragStart = (index) => {
    
    setDraggingColumnIndex(index)
  }
  

  const openDialog = (taskContent, taskId) => {
    setSelectedCardContent(taskContent)
    setSelectedCardId(taskId)  
  }

  const closeDialog = () => {
    setSelectedCardId(null)  
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    if (draggingColumnIndex === null || draggingColumnIndex === index) return

    const newColumns = [...columns.lists]
    const draggedColumn = newColumns.splice(draggingColumnIndex, 1)[0]
    newColumns.splice(index, 0, draggedColumn)

    setColumns({ ...columns, lists: newColumns })
    setDraggingColumnIndex(null) // Reset dragging column
  }
  return (
    <>
      {columns?.lists?.map((column,index) => (
        <div key={column._id} className="w-72"
        //  draggable
        // onDragStart={() => handleDragStart(index)}
        // onDragOver={handleDragOver}
        // onDrop={(e) => handleDrop(e, index)}
         >
          <Card className="bg-white text-black border-0">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2" draggable>
                <h2 className="text-sm font-medium">{column.title}</h2>
              </div>

              <div className="space-y-2 text-black">
                {ticketData?.tickets?.filter((task) => task?.listId === column?._id)?.map((task) => (
                  <div key={task._id}>
                    <Card className="bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-colors">
                      <div className="p-2">
                        <div
                          className="flex justify-between items-center cursor-pointer bg-white"
                          onDragStart={() => handleDragStart(task, task.listId)}
                          draggable
                        >
                          <p onClick={() => openDialog(task.title, task?._id)} className="w-full">
                            {task.title}
                          </p>
                        </div>
                      </div>
                    </Card>
                    {selectedCardId === task._id && (
                      <DialogBox
                        isDialogOpen={selectedCardId !== null}
                        setIsDialogOpen={closeDialog}
                        selectedCardContent={selectedCardContent}
                        selectedCardId={selectedCardId}
                      />
                    )}
                  </div>
                ))}
              </div>

              {addingCardForColumnId === column?._id ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => onSubmit(data, column?._id))} className="space-y-2 mt-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" placeholder="Enter card title" className="mb-2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between">
                      <Button type="submit" size="sm" className="bg-primary hover:bg-primary-dark">
                        Add card
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-black hover:bg-gray-200"
                        onClick={() => setAddingCardForColumnId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 hover:bg-white/10 mt-2"
                  onClick={() => setAddingCardForColumnId(column?._id)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add a card
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  )
}
