
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { authAPI, getAuthToken } from "@/services/api";

interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for saved user on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await authAPI.getProfile();
          if (response.success) {
            setUser({
              id: response.user._id,
              email: response.user.email,
              name: response.user.name,
              role: response.user.role
            });
          } else {
            // Token is invalid, remove it
            authAPI.logout();
          }
        } catch (error) {
          console.error("Failed to verify auth token:", error);
          authAPI.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await authAPI.login(email, password);

      if (response.success) {
        const userData = {
          id: response.user._id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role
        };

        setUser(userData);

        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.name || userData.email}!`,
        });

        navigate(userData.role === "admin" ? "/admin" : "/dashboard");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);

    try {
      const response = await authAPI.register(email, password, name);

      if (response.success) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role
        };

        setUser(userData);

        toast({
          title: "Registration successful",
          description: `Welcome, ${name || email}!`,
        });

        navigate("/dashboard");
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authAPI.logout(); // This removes the auth token
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
