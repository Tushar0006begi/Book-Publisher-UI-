import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, Download, Eye } from "lucide-react"

const contracts = [
  {
    id: 1,
    author: "Sarah Chen",
    bookTitle: "The Digital Mind",
    signedDate: "December 15, 2023",
    status: "active",
    royaltyRate: "15%",
    term: "5 years",
  },
  {
    id: 2,
    author: "Marcus Johnson",
    bookTitle: "Ocean Stories",
    signedDate: "November 20, 2023",
    status: "active",
    royaltyRate: "20%",
    term: "3 years",
  },
  {
    id: 3,
    author: "Elena Rodriguez",
    bookTitle: "Mindful Living",
    signedDate: "October 10, 2023",
    status: "active",
    royaltyRate: "15%",
    term: "5 years",
  },
]

export default function ContractsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Publishing Contracts</h1>
          <p className="text-muted-foreground">Manage copyright agreements and author contracts</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Contract
        </Button>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2">{contract.bookTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground">Author: {contract.author}</p>
                </div>
                <Badge>{contract.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Signed Date</p>
                  <p className="font-medium">{contract.signedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Royalty Rate</p>
                  <p className="font-medium">{contract.royaltyRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Term</p>
                  <p className="font-medium">{contract.term}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Copyright</p>
                  <p className="font-medium">Transferred</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Contract
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Generate New Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a copyright contract template or generate one from accepted submissions. Contracts should include
            royalty rates, term length, and copyright transfer details.
          </p>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX (Max 10MB)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
