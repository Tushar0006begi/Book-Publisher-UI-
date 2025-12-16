import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingCart, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">BookHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Books
            </Link>
            <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">
              My Orders
            </Link>
            <Link href="/downloads" className="text-sm font-medium hover:text-primary transition-colors">
              Downloads
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/author">Author Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/publisher">Publisher Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
