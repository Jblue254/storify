import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Added useLocation

export const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); // 2. Track prior history context

  // Safely capture where they came from (e.g., /checkout) or default back home
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Simulated API Delay & Response
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      const fakeToken = "jwt-access-token-example";
      const fakeUser = { 
        id: "u-secure-1", 
        email: formData.email,
        name: formData.email.split('@')[0], // ✨ Fix: Fallback name parsing so it's never undefined
        role: "customer" 
      };

      login(fakeToken, fakeUser);
      
      // 3. Navigate back to their intended step instead of blindly dropping them home
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20 animate-in fade-in zoom-in-95">
                {error}
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full"
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#forgot" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-2">
            <Button type="submit" className="w-full font-medium" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground w-full">
              Don't have an account?{' '}
              <a href="#register" className="font-medium text-primary hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};