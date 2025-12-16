import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role="author" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
