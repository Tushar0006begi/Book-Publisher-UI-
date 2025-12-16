"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { getSubmissions } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Submission {
  id: number
  title: string
  category: string
  synopsis: string
  status: string
  created_at: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "accepted":
      return "default"
    case "pending":
      return "secondary"
    case "rejected":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getSubmissions()
        setSubmissions(data)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch submissions.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [toast])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Submissions</h1>
          <p className="text-muted-foreground">Track the status of your manuscript submissions</p>
        </div>
        <Button asChild>
          <Link href="/author/submit">New Submission</Link>
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No submissions yet</p>
            <Button asChild>
              <Link href="/author/submit">Submit Your First Manuscript</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="mb-2">{submission.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {submission.category} • Submitted {new Date(submission.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(submission.status)}>{submission.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Synopsis</p>
                    <p className="text-sm text-muted-foreground">{submission.synopsis}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
