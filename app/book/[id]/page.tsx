import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Download } from "lucide-react"

export default function BookDetailsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden sticky top-24">
              <img
                src="/modern-tech-book-cover.png"
                alt="The Digital Mind"
                className="w-full aspect-[3/4] object-cover"
              />
            </Card>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge className="mb-2">Technology</Badge>
              <h1 className="text-4xl font-bold mb-2">The Digital Mind</h1>
              <p className="text-xl text-muted-foreground mb-4">by Sarah Chen</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold">$24.99</span>
                <span className="text-lg text-muted-foreground line-through">$34.99</span>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="h-5 w-5 mr-2" />
                  Sample
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4 mt-4">
                    <h3 className="font-semibold text-lg">Synopsis</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Explore the intersection of technology and human consciousness in this groundbreaking work. Sarah
                      Chen takes readers on a journey through the evolution of artificial intelligence, examining how
                      digital systems mirror and enhance human cognitive processes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      From neural networks to quantum computing, "The Digital Mind" offers insights into the future of
                      human-computer interaction and the philosophical implications of machine intelligence. This book
                      is essential reading for anyone interested in the future of technology and humanity.
                    </p>
                    <div className="pt-4">
                      <h4 className="font-semibold mb-2">Key Topics:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Artificial Intelligence and Machine Learning</li>
                        <li>Neural Networks and Deep Learning</li>
                        <li>Quantum Computing Fundamentals</li>
                        <li>Ethics in AI Development</li>
                        <li>Future of Human-Computer Interaction</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ISBN</p>
                        <p className="font-medium">978-3-16-148410-0</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Publisher</p>
                        <p className="font-medium">TechPress Publishing</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Publication Date</p>
                        <p className="font-medium">January 15, 2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pages</p>
                        <p className="font-medium">342</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="font-medium">English</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Format</p>
                        <p className="font-medium">Digital (PDF, EPUB)</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-border pb-4 last:border-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                            </div>
                            <span className="font-medium">John Doe</span>
                            <span className="text-sm text-muted-foreground">• 2 weeks ago</span>
                          </div>
                          <p className="text-muted-foreground">
                            An exceptional read! The author's insights into AI and consciousness are both profound and
                            accessible. Highly recommended for anyone interested in the future of technology.
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
