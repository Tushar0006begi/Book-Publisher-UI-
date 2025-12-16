import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

const downloads = [
  {
    id: 1,
    title: "The Digital Mind",
    author: "Sarah Chen",
    cover: "/modern-tech-book-cover.png",
    formats: ["PDF", "EPUB"],
    purchaseDate: "January 20, 2024",
  },
  {
    id: 2,
    title: "Ocean Stories",
    author: "Marcus Johnson",
    cover: "/ocean-adventure-book-cover.jpg",
    formats: ["PDF", "EPUB"],
    purchaseDate: "January 20, 2024",
  },
  {
    id: 3,
    title: "Mindful Living",
    author: "Elena Rodriguez",
    cover: "/mindfulness-wellness-book-cover.jpg",
    formats: ["PDF", "EPUB"],
    purchaseDate: "January 15, 2024",
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-2">My Library</h1>
        <p className="text-muted-foreground mb-8">Download your purchased books anytime</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                className="w-full aspect-[3/4] object-cover"
              />
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                  <p className="text-xs text-muted-foreground">Purchased {book.purchaseDate}</p>
                </div>
                <div className="space-y-2">
                  {book.formats.map((format) => (
                    <Button key={format} variant="outline" className="w-full justify-start bg-transparent" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Download {format}
                      <Download className="h-4 w-4 ml-auto" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
