
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShieldCheck, UserRound, Star, ExternalLink, ClockIcon, Factory, Cpu, Settings, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // Factory and manufacturing news articles
  const articles = [
    {
      title: "AI-Driven Layout Optimization Increases Efficiency by 32%",
      description: "A case study on how modern layout algorithms reduced material handling costs.",
      date: "May 5, 2025",
      category: "Case Study",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      link: "#"
    },
    {
      title: "The Future of Smart Factory Floor Planning",
      description: "How intelligent software is transforming manufacturing space utilization.",
      date: "May 2, 2025",
      category: "Industry Trends",
      icon: <Factory className="h-5 w-5 text-primary" />,
      link: "#"
    },
    {
      title: "Implementing Relationship-Based Department Layout",
      description: "Best practices for creating efficient workflow between departments.",
      date: "April 28, 2025",
      category: "Best Practices",
      icon: <Settings className="h-5 w-5 text-primary" />,
      link: "#"
    },
    {
      title: "New Algorithms for Complex Manufacturing Environments",
      description: "Research breakthroughs in optimizing multi-constraint layout problems.",
      date: "April 23, 2025",
      category: "Research",
      icon: <Cpu className="h-5 w-5 text-primary" />,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Navigation Bar */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-12 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Layout Harmony</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                About
              </Link>
              <Link to="/#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Contact
              </Link>
              <Link to="/#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Pricing
              </Link>
              <Link to="/#documentation" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Documentation
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <Button onClick={() => navigate(isAdmin ? "/admin" : "/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <div className="flex gap-2">
                <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Choose Login Option</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* User Login Card */}
                      <Card className="overflow-hidden transition-all hover:shadow-md">
                        <CardContent className="p-0">
                          <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-4">
                            <div className="flex justify-center mb-2">
                              <UserRound size={36} />
                            </div>
                            <h3 className="text-lg font-bold text-center">User Login</h3>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-center mb-3">
                              Access your personal dashboard to create and analyze department layouts
                            </p>
                            <div className="flex justify-center">
                              <Link to="/user-login" onClick={() => setIsLoginDialogOpen(false)}>
                                <Button size="sm" className="w-full">Login as User</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Admin Login Card */}
                      <Card className="overflow-hidden transition-all hover:shadow-md">
                        <CardContent className="p-0">
                          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-4">
                            <div className="flex justify-center mb-2">
                              <ShieldCheck size={36} />
                            </div>
                            <h3 className="text-lg font-bold text-center">Admin Login</h3>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-center mb-3">
                              Access administrative tools to view and manage user submissions
                            </p>
                            <div className="flex justify-center">
                              <Link to="/admin-login" onClick={() => setIsLoginDialogOpen(false)}>
                                <Button variant="outline" size="sm" className="w-full">Login as Admin</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="text-center text-xs text-muted-foreground">
                        <p>
                          Demo Credentials<br />
                          Admin: admin@example.com / admin123<br />
                          User: user@example.com / user123
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container flex-1 flex flex-col items-center justify-center pt-6 pb-8">
        <div className="w-full max-w-5xl animate-fade-in">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-primary mb-4">
              Layout complexity
            </h1>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Focus on efficiency<br />
              that matters.
            </h2>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              We provide AI tools to help you create better department layouts.
              Available on Windows and Mac.
            </p>
            

            
            <div className="flex justify-center items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white text-xs">S</div>
                <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-white text-xs">M</div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium">Highly Rated</span>
            </div>
          </div>
          

        </div>
      </div>
      
      {/* Factory Manufacturing News Section */}
      <div className="container py-10 bg-gradient-to-b from-background to-blue-50/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Layout & Manufacturing Insights</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <ClockIcon className="mr-1 h-3 w-3" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    {article.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to={article.link} className="text-sm text-primary font-medium flex items-center hover:underline">
                    Read more
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-2">
              View All Articles
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
