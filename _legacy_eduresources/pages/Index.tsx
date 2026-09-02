import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, FileText, ClipboardList, Download, Search, TrendingUp, BookOpen } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Complete Study Resource Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access notes, assignments, and previous year questions all in one place. Download resources instantly and ace your exams.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/resources">
              <Button size="lg" className="gap-2">
                <FolderOpen className="h-5 w-5" />
                Browse Resources
              </Button>
            </Link>
            <Link to="/pyqs">
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="h-5 w-5" />
                View PYQs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/resources" className="block">
              <Card className="h-full hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Study Notes</CardTitle>
                  <CardDescription>
                    Comprehensive notes covering all subjects and topics. Well-organized and easy to understand.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/assignments" className="block">
              <Card className="h-full hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <ClipboardList className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>
                    Past assignments and solutions to help you practice and prepare better.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/pyqs" className="block">
              <Card className="h-full hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Previous Year Questions</CardTitle>
                  <CardDescription>
                    Access exam papers from previous years to understand patterns and prepare effectively.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Downloads</h3>
              <p className="text-sm text-muted-foreground">
                One-click downloads with no hassle. Get your resources instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Search</h3>
              <p className="text-sm text-muted-foreground">
                Find exactly what you need with our powerful search functionality.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-sm text-muted-foreground">
                Fresh content added regularly to keep you up-to-date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start exploring our vast collection of educational resources today.
          </p>
          <Link to="/notes">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started
              <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
