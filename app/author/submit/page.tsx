"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, Loader2 } from "lucide-react"
import { submitManuscript } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function SubmitManuscriptPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    category: "",
    synopsis: "",
    wordCount: "",
    assignCopyright: false,
  })
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (isDraft = false) => {
    setLoading(true)
    try {
      if (!formData.title || !formData.category || !formData.synopsis || !manuscriptFile) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields and upload a manuscript file.",
          variant: "destructive",
        })
        return
      }

      const data = {
        ...formData,
        wordCount: Number.parseInt(formData.wordCount) || 0,
        status: isDraft ? "draft" : "pending",
      }

      const result = await submitManuscript(data, manuscriptFile)

      toast({
        title: isDraft ? "Draft saved" : "Manuscript submitted",
        description: isDraft
          ? "Your draft has been saved successfully."
          : "Your manuscript has been submitted for review.",
      })

      // Reset form
      setFormData({
        title: "",
        isbn: "",
        category: "",
        synopsis: "",
        wordCount: "",
        assignCopyright: false,
      })
      setManuscriptFile(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit manuscript. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit Manuscript</h1>
        <p className="text-muted-foreground">Upload your manuscript and provide details for publisher review</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Manuscript Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Manuscript *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setManuscriptFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="manuscript-upload"
                />
                <label htmlFor="manuscript-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, TXT (Max 50MB)</p>
                </label>
              </div>
              {manuscriptFile && (
                <div className="flex items-center gap-2 p-3 border border-border rounded-lg">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{manuscriptFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(manuscriptFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setManuscriptFile(null)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN (Optional)</Label>
              <Input
                id="isbn"
                placeholder="978-3-16-148410-0"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Self-Help">Self-Help</SelectItem>
                  <SelectItem value="Philosophy">Philosophy</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="synopsis">Synopsis *</Label>
              <Textarea
                id="synopsis"
                rows={6}
                placeholder="Provide a compelling synopsis of your book..."
                value={formData.synopsis}
                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wordCount">Word Count</Label>
              <Input
                id="wordCount"
                type="number"
                placeholder="75000"
                value={formData.wordCount}
                onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publisher Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="assignCopyright"
                checked={formData.assignCopyright}
                onCheckedChange={(checked) => setFormData({ ...formData, assignCopyright: checked as boolean })}
              />
              <div className="space-y-1">
                <Label htmlFor="assignCopyright" className="font-medium cursor-pointer">
                  Assign copyright to a Publisher
                </Label>
                <p className="text-sm text-muted-foreground">
                  By checking this box, you agree to transfer copyright ownership to the accepting publisher as per the
                  publishing contract terms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button size="lg" onClick={() => handleSubmit(false)} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Submit for Review
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent"
            onClick={() => handleSubmit(true)}
            disabled={loading}
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
