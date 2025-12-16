import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function PublisherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role="publisher" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
