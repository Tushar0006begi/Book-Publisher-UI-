import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search, TrendingUp, Award, Users } from "lucide-react"
import Link from "next/link"

const featuredBooks = [
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
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Explore thousands of books from independent authors and established publishers. Support creators directly
            through our platform.
          </p>
          <div className="flex gap-2 max-w-xl mx-auto">
            <Input type="search" placeholder="Search books, authors, or ISBN..." className="flex-1" />
            <Button size="lg">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Books</h2>
          <Button variant="outline" asChild>
            <Link href="/browse">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
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
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-muted-foreground">Active Authors</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">50K+</h3>
              <p className="text-muted-foreground">Published Books</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">2M+</h3>
              <p className="text-muted-foreground">Books Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Are you an author or publisher?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Join our platform to publish your work and reach millions of readers worldwide.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/author">Author Portal</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/publisher">Publisher Portal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
