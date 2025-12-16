import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, BookOpen, Users, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentSales = [
  { book: "The Digital Mind", author: "Sarah Chen", units: 45, revenue: 1124.55 },
  { book: "Ocean Stories", author: "Marcus Johnson", units: 38, revenue: 759.62 },
  { book: "Mindful Living", author: "Elena Rodriguez", units: 52, revenue: 1195.48 },
  { book: "Code Mastery", author: "David Park", units: 29, revenue: 869.71 },
]

export default function PublisherDashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Publisher Dashboard</h1>
        <p className="text-muted-foreground">Overview of your publishing business performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">$127,459</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Books Published</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">247</p>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Active Authors</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">89</p>
            <p className="text-xs text-muted-foreground">+7 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Pending Submissions</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">23</p>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Units Sold (Today)</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{sale.book}</TableCell>
                  <TableCell>{sale.author}</TableCell>
                  <TableCell className="text-right">{sale.units}</TableCell>
                  <TableCell className="text-right">${sale.revenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "The Digital Mind", revenue: 45289, trend: "+24%" },
                { title: "Code Mastery", revenue: 38720, trend: "+18%" },
                { title: "Ocean Stories", revenue: 32156, trend: "+15%" },
              ].map((book, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">${book.revenue.toLocaleString()} revenue</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{book.trend}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div>
                  <p className="font-medium">Author Royalties</p>
                  <p className="text-sm text-muted-foreground">Due February 1, 2024</p>
                </div>
                <p className="text-lg font-bold">$18,432</p>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div>
                  <p className="font-medium">Platform Revenue</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <p className="text-lg font-bold">$109,027</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Average royalty rate</p>
                <p className="font-medium">15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
