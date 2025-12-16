import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"
import Link from "next/link"

const books = [
  {
    id: 1,
    title: "The Digital Mind",
    author: "Sarah Chen",
    price: 24.99,
    cover: "/modern-tech-book-cover.png",
    category: "Technology",
  },
  {
    id: 2,
    title: "Ocean Stories",
    author: "Marcus Johnson",
    price: 19.99,
    cover: "/ocean-adventure-book-cover.jpg",
    category: "Fiction",
  },
  {
    id: 3,
    title: "Mindful Living",
    author: "Elena Rodriguez",
    price: 22.99,
    cover: "/mindfulness-wellness-book-cover.jpg",
    category: "Self-Help",
  },
  {
    id: 4,
    title: "Code Mastery",
    author: "David Park",
    price: 29.99,
    cover: "/programming-coding-book-cover.jpg",
    category: "Technology",
  },
  {
    id: 5,
    title: "Ancient Wisdom",
    author: "Li Wei",
    price: 18.99,
    cover: "/ancient-philosophy-book-cover.jpg",
    category: "Philosophy",
  },
  {
    id: 6,
    title: "Modern Architecture",
    author: "Anna Schmidt",
    price: 34.99,
    cover: "/architecture-design-book-cover.jpg",
    category: "Design",
  },
  {
    id: 7,
    title: "Startup Journey",
    author: "Alex Thompson",
    price: 26.99,
    cover: "/business-startup-book-cover.jpg",
    category: "Business",
  },
  {
    id: 8,
    title: "Space Odyssey",
    author: "James Miller",
    price: 21.99,
    cover: "/space-exploration-book-cover.jpg",
    category: "Science",
  },
]

const categories = ["All", "Fiction", "Technology", "Self-Help", "Philosophy", "Design", "Business", "Science"]

export default function BrowsePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Browse Books</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search books..." className="pl-9" />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="under20" />
                      <Label htmlFor="under20" className="text-sm font-normal cursor-pointer">
                        Under $20
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="20to30" />
                      <Label htmlFor="20to30" className="text-sm font-normal cursor-pointer">
                        $20 - $30
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="over30" />
                      <Label htmlFor="over30" className="text-sm font-normal cursor-pointer">
                        Over $30
                      </Label>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Books Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{books.length} books found</p>
              <Select defaultValue="popular">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/book/${book.id}`}>
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{book.category}</p>
                    <Link href={`/book/${book.id}`}>
                      <h3 className="font-semibold mb-1 hover:text-primary transition-colors">{book.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-lg font-bold">${book.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
