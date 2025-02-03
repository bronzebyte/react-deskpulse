import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

const recentItems = [
  {
    id: 1,
    title: "sdfsdf",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s1fCaApbxbgfJBIEC1kdUzXlkEp9XD.png",
  },
  {
    id: 2,
    title: "asdasd",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s1fCaApbxbgfJBIEC1kdUzXlkEp9XD.png",
  },
  {
    id: 3,
    title: "Wow",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s1fCaApbxbgfJBIEC1kdUzXlkEp9XD.png",
  },
]

export default function RecentlyViewed({title}) {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {recentItems.map((item) => (
          <Card key={item.id} className="flex-shrink-0 w-[300px] overflow-hidden group">
            <CardContent className="p-0 relative">
              <div className="w-full h-[200px] bg-green-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                <h3 className="text-white font-medium">{item.title}</h3>
                <Eye className="w-4 h-4 text-white/80" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

