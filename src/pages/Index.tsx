
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Layout Harmony Compass</h1>
          <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
            Optimize your department layout designs with our powerful analysis tool.
            Input your department relationships and sequence to calculate the optimal layout score.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6">
                <h3 className="text-2xl font-bold">For Users</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Configure your department layouts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create relationship matrices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Calculate optimal layout scores</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save and reuse your layouts</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 flex justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-40">Sign Up</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6">
                <h3 className="text-2xl font-bold">For Administrators</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View all registered users</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access all user layout submissions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Export data for analysis</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Filter and search submissions</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 flex justify-center">
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-40">Sign In</Button>
                </Link>
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

export default Index;
