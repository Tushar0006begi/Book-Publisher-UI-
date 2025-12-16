import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Package, AlertCircle } from "lucide-react"

const inventory = [
  {
    id: 1,
    title: "The Digital Mind",
    isbn: "978-3-16-148410-0",
    format: "Digital",
    stock: "Unlimited",
    status: "available",
    printOnDemand: true,
  },
  {
    id: 2,
    title: "Ocean Stories",
    isbn: "978-3-16-148411-7",
    format: "Physical",
    stock: 450,
    status: "available",
    printOnDemand: true,
  },
  {
    id: 3,
    title: "Mindful Living",
    isbn: "978-3-16-148412-4",
    format: "Both",
    stock: 120,
    status: "low-stock",
    printOnDemand: true,
  },
  {
    id: 4,
    title: "Code Mastery",
    isbn: "978-3-16-148413-1",
    format: "Digital",
    stock: "Unlimited",
    status: "available",
    printOnDemand: false,
  },
]

export default function InventoryPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Inventory Management</h1>
        <p className="text-muted-foreground">Manage book inventory and print-on-demand settings</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Books</p>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{inventory.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-3xl font-bold">{inventory.filter((item) => item.status === "low-stock").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Print-on-Demand</p>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{inventory.filter((item) => item.printOnDemand).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory List */}
      <div className="space-y-4">
        {inventory.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">ISBN: {item.isbn}</p>
                </div>
                <Badge variant={item.status === "low-stock" ? "destructive" : "default"}>
                  {item.status === "low-stock" ? "Low Stock" : "Available"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Format</p>
                  <Select defaultValue={item.format.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`stock-${item.id}`} className="text-sm text-muted-foreground">
                    Stock Level
                  </Label>
                  <Input
                    id={`stock-${item.id}`}
                    type="text"
                    defaultValue={item.stock}
                    className="mt-2"
                    disabled={item.format === "Digital"}
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Print-on-Demand</p>
                  <Select defaultValue={item.printOnDemand ? "enabled" : "disabled"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full bg-transparent">
                    Update
                  </Button>
                </div>
              </div>
              {item.status === "low-stock" && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <p className="text-sm text-destructive">
                    Stock is running low. Consider ordering more inventory or enabling print-on-demand.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
