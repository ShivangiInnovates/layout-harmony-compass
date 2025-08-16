
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShieldCheck, UserRound, Star, ExternalLink, ClockIcon, Factory, Cpu, Settings, TrendingUp, Zap, Target, BarChart3, Users, Globe, ArrowRight, Play, Sparkles, Grid3X3, Brain, Rocket, Shield, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

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

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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

  // Stats data
  const stats = [
    { number: "32%", label: "Efficiency Increase", icon: TrendingUp },
    { number: "500+", label: "Companies Served", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Globe }
  ];

  // Features data
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Optimization",
      description: "Advanced genetic algorithms and machine learning for optimal space utilization.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Grid3X3,
      title: "Smart Layout Planning",
      description: "Intelligent department placement with relationship-based algorithms.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive insights and performance metrics for continuous improvement.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimize complex layouts in seconds, not hours.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.header 
        className="w-full bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center gap-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Grid3X3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                SmartGrid PlannerX
              </span>
            </Link>
            
            <nav className="hidden md:flex gap-8">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
                { href: "#pricing", label: "Pricing" },
                { href: "#documentation", label: "Documentation" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                >
                  <a 
                    href={item.href}
                    className="text-sm font-medium text-white/70 transition-all duration-300 hover:text-cyan-400 relative group cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            {isAuthenticated ? (
              <Button 
                onClick={() => navigate(isAdmin ? "/admin" : "/dashboard")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Dashboard
              </Button>
            ) : (
              <div className="flex gap-3">
                <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/40 text-white hover:bg-white/20 hover:border-white/60 bg-white/5 transition-all duration-300"
                    >
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-slate-900/95 border-white/20 backdrop-blur-xl [&_[data-radix-dialog-close]]:text-white [&_[data-radix-dialog-close]]:opacity-80 [&_[data-radix-dialog-close]:hover]:opacity-100 [&_[data-radix-dialog-close]:hover]:bg-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-white">Choose Login Option</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* User Login Card */}
                      <Card className="overflow-hidden transition-all hover:shadow-lg bg-slate-800/50 border-white/20">
                        <CardContent className="p-0">
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-4">
                            <div className="flex justify-center mb-2">
                              <UserRound size={36} />
                            </div>
                            <h3 className="text-lg font-bold text-center">User Login</h3>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-center mb-3 text-white/70">
                              Access your personal dashboard to create and analyze department layouts
                            </p>
                            <div className="flex justify-center">
                              <Link to="/user-login" onClick={() => setIsLoginDialogOpen(false)}>
                                <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">Login as User</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Admin Login Card */}
                      <Card className="overflow-hidden transition-all hover:shadow-lg bg-slate-800/50 border-white/20">
                        <CardContent className="p-0">
                          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-4">
                            <div className="flex justify-center mb-2">
                              <ShieldCheck size={36} />
                            </div>
                            <h3 className="text-lg font-bold text-center">Admin Login</h3>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-center mb-3 text-white/70">
                              Access administrative tools to view and manage user submissions
                            </p>
                            <div className="flex justify-center">
                              <Link to="/admin-login" onClick={() => setIsLoginDialogOpen(false)}>
                                <Button variant="outline" size="sm" className="w-full border-white/40 text-white hover:bg-white/20 hover:border-white/60 bg-slate-800/30">Login as Admin</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="text-center text-xs text-white/50">
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
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Radial spotlight */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
          }}
        />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-left"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-white/80">AI-Powered Layout Optimization</span>
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  SmartGrid PlannerX
                </span>
              </motion.h1>

              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-8 leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI-Powered Layout<br />
                  Optimization Platform
                </span>
              </motion.h2>

              <motion.p 
                className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              >
                Transform your facility planning with intelligent genetic algorithms and machine learning for optimal space utilization.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-6 border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/20 hover:border-white/60 text-lg px-8 py-6 transition-all duration-300 group bg-white/5"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
              >
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">S</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">M</div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium text-white/80">Highly Rated by Industry Experts</span>
              </motion.div>
            </motion.div>

            {/* Right Side - Images */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              <div className="relative">
                {/* Main Image - image.png */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="relative group">
                    {/* Glowing Border Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                    
                    {/* Main Image Container */}
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-4 shadow-2xl">
                      <img 
                        src="image.png" 
                        alt="SmartGrid PlannerX Platform" 
                        className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Floating Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 2.0, ease: "backOut" }}
                        className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-white/20"
                      >
                        Smart Planner
                      </motion.div>
                    </div>
                  </div>
                </motion.div>



                {/* Floating Elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 2.0, delay: 2.0, ease: "easeOut" }}
                  className="absolute -bottom-8 -left-8 z-30"
                >
                  <div className="relative group">
                    {/* Glowing Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                    
                    {/* Main Container */}
                    <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <Grid3X3 className="h-12 w-12 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
                    </div>
                  </div>
                </motion.div>

                {/* Additional Floating Elements */}
                <motion.div
                  initial={{ x: -30, y: -30, opacity: 0, rotate: -45 }}
                  animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 1.8, delay: 2.8, ease: "easeOut" }}
                  className="absolute top-20 -left-12 z-20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-sm border border-purple-400/30 rounded-xl flex items-center justify-center shadow-lg">
                    <Brain className="h-8 w-8 text-purple-300" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 30, y: -20, opacity: 0, rotate: 45 }}
                  animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 1.8, delay: 3.0, ease: "easeOut" }}
                  className="absolute top-32 right-8 z-20"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500/30 to-red-600/30 backdrop-blur-sm border border-orange-400/30 rounded-xl flex items-center justify-center shadow-lg">
                    <Rocket className="h-7 w-7 text-orange-300" />
                  </div>
                </motion.div>

                {/* Background Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 to-pink-600/10 rounded-full blur-2xl -z-10 animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-xl -z-10 animate-pulse delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>


      </motion.section>
      
      {/* About Section */}
      <motion.section 
        id="about"
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                About SmartGrid PlannerX
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Revolutionizing facility layout optimization through cutting-edge AI technology and advanced algorithms
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI-Powered Intelligence</h3>
                    <p className="text-white/70">Our advanced machine learning algorithms analyze complex facility data to generate optimal layouts that maximize efficiency and productivity.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Grid3X3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Smart Grid Technology</h3>
                    <p className="text-white/70">Leveraging the latest in grid computing and distributed systems to handle complex optimization problems at scale.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
                    <p className="text-white/70">Trusted by leading manufacturers worldwide, delivering measurable improvements in efficiency and cost savings.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Industry Leader</h3>
                  <p className="text-white/80 mb-6">Recognized as the premier solution for facility layout optimization, serving Fortune 500 companies across manufacturing sectors.</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-cyan-400">15+</div>
                      <div className="text-white/70 text-sm">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-cyan-400">50+</div>
                      <div className="text-white/70 text-sm">Countries Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.div 
        ref={statsRef}
        className="py-20 relative"
        initial={{ opacity: 0 }}
        animate={isStatsInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, staggerChildren: 0.2 }}
          >
            {stats.map((stat, index) => (
                              <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.0, delay: index * 0.2 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-4 hover:bg-white/10 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <motion.div 
                      className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                      initial={{ scale: 0 }}
                      animate={isStatsInView ? { scale: 1 } : {}}
                      transition={{ duration: 1.0, delay: index * 0.2 + 0.5, type: "spring", stiffness: 150 }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-white/70 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        ref={featuresRef}
        className="py-20 relative"
        initial={{ opacity: 0 }}
        animate={isFeaturesInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to optimize your facility layout with cutting-edge AI technology
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, staggerChildren: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ y: 50, opacity: 0 }}
                animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.0, delay: index * 0.2 }}
                whileHover={{ y: -10, rotateY: 5 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/20">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.section 
        id="pricing"
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Flexible pricing options designed to scale with your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">$99</div>
                  <div className="text-white/70">per month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Up to 5 layouts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Basic optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Email support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Standard reports</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                  Get Started
                </Button>
              </div>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-8 h-full hover:bg-cyan-500/30 transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">$299</div>
                  <div className="text-white/70">per month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Up to 25 layouts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Advanced optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Custom reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">API access</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                  Get Started
                </Button>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">Custom</div>
                  <div className="text-white/70">contact sales</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Unlimited layouts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Custom algorithms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">White-label solution</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">On-premise option</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Factory Manufacturing News Section */}
      <motion.div 
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Latest SmartGrid & Optimization Insights
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Stay ahead with the latest trends and breakthroughs in facility optimization
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-2xl bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 hover:border-white/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-white/50 text-xs">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        {article.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-white/70">
                      {article.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link to={article.link} className="text-sm text-cyan-400 font-medium flex items-center hover:text-cyan-300 transition-colors duration-300">
                      Read more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Button 
              variant="outline" 
              className="gap-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              View All Articles
              <ExternalLink size={16} />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Documentation Section */}
      <motion.section 
        id="documentation"
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Documentation & Resources
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to get started and master SmartGrid PlannerX
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Quick Start Guide */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Quick Start Guide</h3>
                <p className="text-white/70 text-sm mb-6">Get up and running with SmartGrid PlannerX in under 10 minutes with our comprehensive quick start guide.</p>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Read Guide
                </Button>
              </div>
            </motion.div>

            {/* API Reference */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">API Reference</h3>
                <p className="text-white/70 text-sm mb-6">Complete API documentation with examples, endpoints, and integration guides for developers.</p>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  View API Docs
                </Button>
              </div>
            </motion.div>

            {/* Video Tutorials */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Video Tutorials</h3>
                <p className="text-white/70 text-sm mb-6">Step-by-step video tutorials covering all aspects of the platform from basic to advanced features.</p>
                <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white/20 hover:border-white/60 bg-white/5">
                  Watch Videos
                </Button>
              </div>
            </motion.div>

            {/* Best Practices */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Best Practices</h3>
                <p className="text-white/70 text-sm mb-6">Learn industry best practices and optimization strategies from our team of experts.</p>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Read Best Practices
                </Button>
              </div>
            </motion.div>

            {/* Community Forum */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Community Forum</h3>
                <p className="text-white/70 text-sm mb-6">Connect with other users, share experiences, and get help from the community.</p>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Join Community
                </Button>
              </div>
            </motion.div>

            {/* Support Center */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Support Center</h3>
                <p className="text-white/70 text-sm mb-6">Get help with common issues, submit tickets, and access our knowledge base.</p>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Get Support
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Ready to transform your facility? Let's discuss how SmartGrid PlannerX can help optimize your operations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors duration-300 resize-none"
                      placeholder="Tell us about your facility optimization needs..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 py-3">
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  <p className="text-white/80 mb-6">We're here to help you optimize your facility layout and improve operational efficiency.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Visit Us</h4>
                      <p className="text-white/70">123 Innovation Drive<br />Tech City, TC 12345<br />United States</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Sales Team</h4>
                      <p className="text-white/70">sales@smartgridplannerx.com<br />+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Support</h4>
                      <p className="text-white/70">support@smartgridplannerx.com<br />+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Business Hours</h4>
                  <div className="space-y-2 text-white/70">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.div 
        ref={ctaRef}
        className="py-20 relative"
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div className="container">
          <motion.div 
            className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-16 text-center relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.1),transparent_50%)]" />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Ready to Transform Your Facility?
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
                initial={{ y: 30, opacity: 0 }}
                animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                Join hundreds of companies already optimizing their layouts with SmartGrid PlannerX
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ y: 30, opacity: 0 }}
                animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.9 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-10 py-6 border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
                >
                  Start Optimizing Now
                  <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-10 py-6 transition-all duration-300"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="py-16 border-t border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Grid3X3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  SmartGrid PlannerX
                </span>
              </div>
              <p className="text-white/70 text-sm">
                AI-powered facility layout optimization platform for modern manufacturing.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Community</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Status</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © 2025 SmartGrid PlannerX. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
