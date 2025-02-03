import { useState } from "react"
import { DndContext, closestCorners, useSensors, useSensor, PointerSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Plus, X, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { SortableItem } from "./sortableItem"

const initialColumns = {
  todo: { title: "To Do", tasks: [] },
  doing: { title: "Doing", tasks: [] },
  done: { title: "Done", tasks: [] },
}

export default function ProjectView() {
  const [columns, setColumns] = useState(initialColumns)
  const [isAddingList, setIsAddingList] = useState(false)
  const [newListTitle, setNewListTitle] = useState("")
  const [addingCardForColumnId, setAddingCardForColumnId] = useState(null)
  const [newCardContent, setNewCardContent] = useState("")
  const [editingCardId, setEditingCardId] = useState(null)
  const [editingContent, setEditingContent] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCardContent, setSelectedCardContent] = useState("")
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const activeColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].tasks.some((task) => task.id === active.id),
    )
    const overColumnId = over.id
    const validColumns = ['ToDo', 'Doing', 'Done'];
    if (activeColumnId !== overColumnId) {

setColumns((prev) => {
  if (!validColumns.includes(activeColumnId) || !validColumns.includes(overColumnId)) {
    return prev; 
  }
  const activeItems = prev[activeColumnId]?.tasks || [];
  const overItems = prev[overColumnId]?.tasks || [];
  const activeIndex = activeItems.findIndex((item) => item.id === active.id);
  if (activeIndex !== -1) {
    const updatedActiveItems = activeItems.filter((item) => item.id !== active.id);

    const updatedOverItems = [...overItems, activeItems[activeIndex]];

    return {
      ...prev,
      [activeColumnId]: {
        ...prev[activeColumnId],
        tasks: updatedActiveItems,
      },
      [overColumnId]: {
        ...prev[overColumnId],
        tasks: updatedOverItems,
      },
    };
  }
  return prev;
});
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const activeColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].tasks.some((task) => task.id === active.id),
    )
    const overColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].tasks.some((task) => task.id === over.id),
    )

    if (activeColumnId !== overColumnId) {
      setColumns((prev) => {
        const activeItems = prev[activeColumnId].tasks
        const overItems = prev[overColumnId].tasks

        const activeIndex = activeItems.findIndex((item) => item.id === active.id)
        const overIndex = overItems.findIndex((item) => item.id === over.id)

        return {
          ...prev,
          [activeColumnId]: {
            ...prev[activeColumnId],
            tasks: [...prev[activeColumnId].tasks.filter((item) => item.id !== active.id)],
          },
          [overColumnId]: {
            ...prev[overColumnId],
            tasks: [
              ...prev[overColumnId].tasks.slice(0, overIndex),
              activeItems[activeIndex],
              ...prev[overColumnId].tasks.slice(overIndex),
            ],
          },
        }
      })
    } else {
      setColumns((prev) => {
        const activeIndex = prev[activeColumnId].tasks.findIndex((item) => item.id === active.id)
        const overIndex = prev[overColumnId].tasks.findIndex((item) => item.id === over.id)

        return {
          ...prev,
          [overColumnId]: {
            ...prev[overColumnId],
            tasks: arrayMove(prev[overColumnId].tasks, activeIndex, overIndex),
          },
        }
      })
    }

    setActiveId(null)
  }

  const addNewList = () => {
    if (newListTitle.trim()) {
      const newId = Date.now().toString()
      setColumns({
        ...columns,
        [newId]: { title: newListTitle, tasks: [] },
      })
      setNewListTitle("")
      setIsAddingList(false)
    }
  }

  const addNewCard = (columnId) => {
    if (newCardContent.trim()) {
      const newCard = {
        id: Date.now().toString(),
        content: newCardContent,
        completed: 0,
        total: 1,
        isEditing: false,
      }
      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          tasks: [...columns[columnId].tasks, newCard],
        },
      })
      setNewCardContent("")
      setAddingCardForColumnId(null)
    }
  }

  const handleCancel = () => {
    setNewCardContent("")
    setAddingCardForColumnId(null)
  }

  const handleEditCard = (columnId, cardId) => {
    setEditingCardId(cardId)
    const cardToEdit = columns[columnId].tasks.find((task) => task.id === cardId)
    setEditingContent(cardToEdit.content)
  }

  const saveCard = (columnId, cardId) => {
    if (editingContent.trim()) {
      setColumns((prevColumns) => {
        const updatedTasks = prevColumns[columnId].tasks.map((task) =>
          task.id === cardId ? { ...task, content: editingContent, isEditing: false } : task,
        )
        return {
          ...prevColumns,
          [columnId]: { ...prevColumns[columnId], tasks: updatedTasks },
        }
      })
      setEditingCardId(null)
      setEditingContent("")
    }
  }

  const openDialog = (taskContent) => {
    setSelectedCardContent(taskContent)
    setIsDialogOpen(true)
  }

  return (
    <div
      className="flex gap-4 p-4 overflow-x-auto min-h-screen"
      style={{
        background: "linear-gradient(135deg, rgb(13, 17, 23) 0%, rgb(88, 130, 80) 100%)",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="w-72">
            <Card className="bg-white text-black border-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium">{column.title}</h2>
                </div>
                <SortableContext items={column.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2 text-black">
                    {column.tasks.map((task) => (
                      <SortableItem key={task.id} id={task.id}>
                        <Card className="bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-colors">
                          <div className="p-2">
                            {editingCardId === task.id ? (
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  value={editingContent}
                                  onChange={(e) => setEditingContent(e.target.value)}
                                />
                                <Button variant="ghost" size="sm" onClick={() => saveCard(columnId, task.id)}>
                                  Save
                                </Button>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center cursor-pointer">
                                <p onClick={() => openDialog(task.content)}>{task.content}</p>
                                <Button variant="ghost" size="sm" onClick={() => handleEditCard(columnId, task.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>

                {addingCardForColumnId === columnId ? (
                  <>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="text"
                        className="mb-2"
                        value={newCardContent}
                        onChange={(e) => setNewCardContent(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addNewCard(columnId)}
                      />
                    </div>
                    <Button onClick={() => addNewCard(columnId)} size="sm" className="bg-primary hover:bg-unset">
                      Add card
                    </Button>
                    <Button variant="ghost" size="sm" className="text-black hover:bg-unset" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm h-8 hover:bg-white/10 mt-2"
                    onClick={() => setAddingCardForColumnId(columnId)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add a card
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
        {isAddingList ? (
          <div className="w-72">
            <Card className="bg-white text-black border-0">
              <CardContent className="p-3">
                <Input
                  type="text"
                  className="mb-2"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNewList()}
                />
                <Button
                  onClick={addNewList}
                  size="sm"
                  className="bg-primary hover:bg-unset"
                >
                  Add List
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingList(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-72 justify-center bg-primary hover:bg-unset"
            onClick={() => setIsAddingList(true)}
          >
            Add a new list
          </Button>
        )}
      </DndContext>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogTitle>Card Details</DialogTitle>
          <DialogDescription>{selectedCardContent}</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
