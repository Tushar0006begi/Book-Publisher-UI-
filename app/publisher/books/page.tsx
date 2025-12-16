import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, TrendingUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"

const books = [
  {
    id: 1,
    title: "The Digital Mind",
    author: "Sarah Chen",
    price: 24.99,
    publisherShare: 85,
    authorRoyalty: 15,
    sales: 342,
    revenue: 8546.58,
    cover: "/modern-tech-book-cover.png",
  },
  {
    id: 2,
    title: "Ocean Stories",
    author: "Marcus Johnson",
    price: 19.99,
    publisherShare: 80,
    authorRoyalty: 20,
    sales: 298,
    revenue: 5957.02,
    cover: "/ocean-adventure-book-cover.jpg",
  },
  {
    id: 3,
    title: "Mindful Living",
    author: "Elena Rodriguez",
    price: 22.99,
    publisherShare: 85,
    authorRoyalty: 15,
    sales: 256,
    revenue: 5885.44,
    cover: "/mindfulness-wellness-book-cover.jpg",
  },
  {
    id: 4,
    title: "Code Mastery",
    author: "David Park",
    price: 29.99,
    publisherShare: 82,
    authorRoyalty: 18,
    sales: 187,
    revenue: 5608.13,
    cover: "/programming-coding-book-cover.jpg",
  },
]

export default function ManageBooksPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Books</h1>
          <p className="text-muted-foreground">Manage pricing, editions, and royalty splits for published books</p>
        </div>
        <Button>Add New Book</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full aspect-[3/4] object-cover" />
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">${book.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sales</span>
                  <span className="font-medium">{book.sales} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-medium">${book.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Royalty Split</span>
                  <span className="font-medium">
                    {book.publisherShare}% / {book.authorRoyalty}%
                  </span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Book Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" defaultValue={book.price} step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publisherShare">Publisher Share (%)</Label>
                      <Input id="publisherShare" type="number" defaultValue={book.publisherShare} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorRoyalty">Author Royalty (%)</Label>
                      <Input id="authorRoyalty" type="number" defaultValue={book.authorRoyalty} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edition">Edition</Label>
                      <Select defaultValue="first">
                        <SelectTrigger id="edition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first">First Edition</SelectItem>
                          <SelectItem value="second">Second Edition</SelectItem>
                          <SelectItem value="revised">Revised Edition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="link" size="sm" className="w-full p-0 h-auto text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
