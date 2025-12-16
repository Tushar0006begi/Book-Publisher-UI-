"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, FileText, DollarSign, BarChart3, Inbox, Settings, FileSignature, Package } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardSidebarProps {
  role: "author" | "publisher"
}

const authorNavItems: NavItem[] = [
  { title: "Profile", href: "/author", icon: Settings },
  { title: "Submit Manuscript", href: "/author/submit", icon: FileText },
  { title: "My Submissions", href: "/author/submissions", icon: Inbox },
  { title: "Sales & Royalties", href: "/author/royalties", icon: DollarSign },
]

const publisherNavItems: NavItem[] = [
  { title: "Dashboard", href: "/publisher", icon: BarChart3 },
  { title: "Submissions Inbox", href: "/publisher/submissions", icon: Inbox },
  { title: "Manage Books", href: "/publisher/books", icon: BookOpen },
  { title: "Contracts", href: "/publisher/contracts", icon: FileSignature },
  { title: "Inventory", href: "/publisher/inventory", icon: Package },
]

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname()
  const navItems = role === "author" ? authorNavItems : publisherNavItems

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">BookHub</span>
          </Link>
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {role === "author" ? "Author Portal" : "Publisher Portal"}
            </p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
