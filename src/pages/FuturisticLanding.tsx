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

const FuturisticLanding = () => {
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
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center gap-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
                { href: "/", label: "Home" },
                { href: "/#about", label: "About" },
                { href: "/#contact", label: "Contact" },
                { href: "/#pricing", label: "Pricing" },
                { href: "/#documentation", label: "Documentation" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link 
                    to={item.href} 
                    className="text-sm font-medium text-white/70 transition-all duration-300 hover:text-cyan-400 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                      className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                    >
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-slate-900/95 border-white/20 backdrop-blur-xl">
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
                                <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">Login as Admin</Button>
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
      <motion.div 
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
          <div className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-white/80">Smart Plan</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                SmartGrid PlannerX
              </span>
            </motion.h1>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI-Powered Layout<br />
                Optimization Platform
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl md:text-2xl text-white/80 mx-auto max-w-3xl mb-10 leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              Transform your facility planning with intelligent genetic algorithms and machine learning for optimal space utilization.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
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
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-6 transition-all duration-300 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              className="flex justify-center items-center gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
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
          </div>
        </div>

        {/* Floating 3D Grid */}
        <motion.div 
          className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block"
          initial={{ x: 100, opacity: 0, rotateY: 45 }}
          animate={{ x: 0, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Smart Plan label above the image */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold shadow-lg z-10">
              Smart Plan
            </div>
            <div className="w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl border border-white/20 backdrop-blur-sm transform rotate-12" />
            <div className="absolute inset-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl border border-white/20 backdrop-blur-sm transform -rotate-6" />
            <div className="absolute inset-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-cyan-600/20 rounded-2xl border border-white/20 backdrop-blur-sm transform rotate-3" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Stats Section */}
      <motion.div 
        ref={statsRef}
        className="py-20 relative"
        initial={{ opacity: 0 }}
        animate={isStatsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-4 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0 }}
                    animate={isStatsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
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
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
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
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ y: 50, opacity: 0 }}
                animate={isFeaturesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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

      {/* Call to Action Section */}
      <motion.div 
        ref={ctaRef}
        className="py-20 relative"
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-16 text-center relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.1),transparent_50%)]" />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Ready to Transform Your Facility?
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
                initial={{ y: 30, opacity: 0 }}
                animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join hundreds of companies already optimizing their layouts with SmartGrid PlannerX
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ y: 30, opacity: 0 }}
                animate={isCtaInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
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

export default FuturisticLanding;

