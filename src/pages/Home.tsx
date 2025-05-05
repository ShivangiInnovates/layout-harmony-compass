
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, UserRound } from "lucide-react";

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Layout Harmony Compass</h1>
          <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
            Choose your login option to access the department layout analysis tool.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* User Login Card */}
          <Card className="overflow-hidden border-2 border-primary/20 shadow-lg transition-all hover:border-primary/50 hover:shadow-xl">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6">
                <div className="flex justify-center mb-4">
                  <UserRound size={48} />
                </div>
                <h3 className="text-2xl font-bold text-center">User Login</h3>
                <p className="mt-4 text-center">
                  Access your personal dashboard to create and analyze department layouts
                </p>
              </div>
              <div className="p-6 flex justify-center">
                <Link to="/user-login">
                  <Button size="lg" className="w-40">Login as User</Button>
                </Link>
              </div>
              <div className="px-6 pb-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Admin Login Card */}
          <Card className="overflow-hidden border shadow-lg transition-all hover:border-slate-400 hover:shadow-xl">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6">
                <div className="flex justify-center mb-4">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="text-2xl font-bold text-center">Admin Login</h3>
                <p className="mt-4 text-center">
                  Access administrative tools to view and manage user submissions
                </p>
              </div>
              <div className="p-6 flex justify-center">
                <Link to="/admin-login">
                  <Button variant="outline" size="lg" className="w-40 border-slate-400">Login as Admin</Button>
                </Link>
              </div>
              <div className="px-6 pb-6 text-center">
                <p className="text-sm text-muted-foreground">
                  For administrative access only
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Demo Credentials<br />
            Admin: admin@example.com / admin123<br />
            User: user@example.com / user123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
