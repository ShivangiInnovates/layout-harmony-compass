
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, UserRound } from "lucide-react";

interface LoginProps {
  isAdminLogin?: boolean;
}

const Login: React.FC<LoginProps> = ({ isAdminLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if this is admin login based on props or URL
  const isAdminLoginPage = isAdminLogin !== undefined ? 
    isAdminLogin : 
    location.pathname === "/admin-login";

  // Prefill demo credentials based on login type
  useEffect(() => {
    if (isAdminLoginPage) {
      setEmail("admin@example.com");
      setPassword("admin123");
    } else if (location.pathname === "/user-login") {
      setEmail("user@example.com");
      setPassword("user123");
    }
  }, [isAdminLoginPage, location.pathname]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className={`shadow-lg ${isAdminLoginPage ? "border-slate-400" : "border-primary/20"}`}>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              {isAdminLoginPage ? (
                <ShieldCheck size={36} className="text-slate-700" />
              ) : (
                <UserRound size={36} className="text-primary" />
              )}
            </div>
            <CardTitle className={`text-2xl font-bold text-center ${isAdminLoginPage ? "text-slate-700" : "text-primary"}`}>
              {isAdminLoginPage ? "Admin Login" : "User Login"}
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to sign in {isAdminLoginPage ? "as administrator" : "to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                variant={isAdminLoginPage ? "outline" : "default"}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In
                  </>
                ) : (
                  `Sign In${isAdminLoginPage ? " as Admin" : ""}`
                )}
              </Button>

              <div className="text-sm text-muted-foreground text-center mt-2">
                For demo, use:
                <div className="font-medium text-primary">
                  {isAdminLoginPage ? "admin@example.com / admin123" : "user@example.com / user123"}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full">
              {!isAdminLoginPage && (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Sign Up
                  </Link>
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Back to Home
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
