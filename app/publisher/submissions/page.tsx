"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Loader2 } from "lucide-react"
import { getSubmissions, updateSubmissionStatus } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Submission {
  id: number
  title: string
  category: string
  synopsis: string
  word_count: number
  status: string
  file_path: string
  created_at: string
  author_name?: string
}

export default function SubmissionsInboxPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubmissions()
  }, [])

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

  const handleAction = async (id: number, status: "accepted" | "rejected") => {
    setActionLoading(id)
    try {
      await updateSubmissionStatus(id, status)
      toast({
        title: status === "accepted" ? "Submission accepted" : "Submission rejected",
        description: `The manuscript has been ${status}.`,
      })
      fetchSubmissions() // Refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update submission status.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const filterByStatus = (status: string) => {
    return submissions.filter((s) => s.status === status)
  }

  const pendingSubmissions = filterByStatus("pending")
  const acceptedSubmissions = filterByStatus("accepted")
  const rejectedSubmissions = filterByStatus("rejected")

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submissions Inbox</h1>
        <p className="text-muted-foreground">Review and manage manuscript submissions from authors</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedSubmissions.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedSubmissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingSubmissions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No pending submissions</p>
              </CardContent>
            </Card>
          ) : (
            pendingSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{submission.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        by {submission.author_name || "Unknown Author"} • {submission.category}
                      </p>
                    </div>
                    <Badge>{submission.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="font-medium">{new Date(submission.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Word Count</p>
                        <p className="font-medium">{submission.word_count?.toLocaleString() || "N/A"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Synopsis</p>
                      <p className="text-sm">{submission.synopsis}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="ml-auto"
                        onClick={() => handleAction(submission.id, "accepted")}
                        disabled={actionLoading === submission.id}
                      >
                        {actionLoading === submission.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(submission.id, "rejected")}
                        disabled={actionLoading === submission.id}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedSubmissions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No accepted submissions</p>
              </CardContent>
            </Card>
          ) : (
            acceptedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{submission.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        by {submission.author_name || "Unknown Author"} • {submission.category}
                      </p>
                    </div>
                    <Badge>accepted</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Synopsis</p>
                      <p className="text-sm">{submission.synopsis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedSubmissions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No rejected submissions</p>
              </CardContent>
            </Card>
          ) : (
            rejectedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{submission.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        by {submission.author_name || "Unknown Author"} • {submission.category}
                      </p>
                    </div>
                    <Badge variant="destructive">rejected</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Synopsis</p>
                      <p className="text-sm">{submission.synopsis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
