import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

const orders = [
  {
    id: "ORD-2024-001",
    date: "January 20, 2024",
    status: "completed",
    total: 70.17,
    items: [
      { title: "The Digital Mind", author: "Sarah Chen", price: 24.99 },
      { title: "Ocean Stories", author: "Marcus Johnson", price: 19.99, quantity: 2 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "January 15, 2024",
    status: "completed",
    total: 22.99,
    items: [{ title: "Mindful Living", author: "Elena Rodriguez", price: 22.99 }],
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="mb-2">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                  </div>
                  <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.author}</p>
                        {item.quantity && item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${((item.quantity || 1) * item.price).toFixed(2)}</p>
                        <Button variant="link" size="sm" asChild>
                          <Link href="/downloads">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
