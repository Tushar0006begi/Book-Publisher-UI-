import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const salesData = [
  {
    month: "January 2024",
    bookTitle: "The Digital Mind",
    unitsSold: 342,
    revenue: 8546.58,
    royaltyRate: "15%",
    royaltyEarned: 1281.99,
  },
  {
    month: "December 2023",
    bookTitle: "The Digital Mind",
    unitsSold: 298,
    revenue: 7445.02,
    royaltyRate: "15%",
    royaltyEarned: 1116.75,
  },
  {
    month: "November 2023",
    bookTitle: "The Digital Mind",
    unitsSold: 256,
    revenue: 6397.44,
    royaltyRate: "15%",
    royaltyEarned: 959.62,
  },
]

export default function RoyaltiesPage() {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const totalRoyalties = salesData.reduce((sum, item) => sum + item.royaltyEarned, 0)
  const totalUnits = salesData.reduce((sum, item) => sum + item.unitsSold, 0)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sales & Royalties</h1>
        <p className="text-muted-foreground">Track your book sales and royalty earnings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">${totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Your Royalties</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">${totalRoyalties.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">15% royalty rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Units Sold</p>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{totalUnits}</p>
            <p className="text-xs text-muted-foreground">Last 3 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sales Breakdown</CardTitle>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Royalty Rate</TableHead>
                <TableHead className="text-right">Royalty Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell>{row.bookTitle}</TableCell>
                  <TableCell className="text-right">{row.unitsSold}</TableCell>
                  <TableCell className="text-right">${row.revenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{row.royaltyRate}</TableCell>
                  <TableCell className="text-right font-medium">${row.royaltyEarned.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div>
                <p className="font-medium">Next Payment</p>
                <p className="text-sm text-muted-foreground">February 1, 2024</p>
              </div>
              <p className="text-lg font-bold">${totalRoyalties.toFixed(2)}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Royalties are paid monthly via direct deposit to your registered bank account. Payment is processed within
              5-7 business days after the payment date.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
