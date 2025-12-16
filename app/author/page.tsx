import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function AuthorProfilePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Author Profile</h1>
        <p className="text-muted-foreground">Manage your author information and payment details</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <Button variant="outline" className="bg-transparent">
                Upload Photo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Chen" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="penName">Pen Name</Label>
              <Input id="penName" placeholder="Optional pen name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah.chen@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                rows={6}
                placeholder="Tell readers about yourself..."
                defaultValue="Sarah Chen is an acclaimed technology writer and researcher specializing in artificial intelligence and cognitive science. With a background in computer science and philosophy, she brings a unique perspective to the intersection of technology and human consciousness."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" placeholder="https://yourwebsite.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="Enter bank name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" placeholder="Enter account number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input id="routingNumber" placeholder="Enter routing number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / EIN</Label>
              <Input id="taxId" placeholder="Enter tax identification number" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button size="lg">Save Changes</Button>
          <Button size="lg" variant="outline" className="bg-transparent">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
