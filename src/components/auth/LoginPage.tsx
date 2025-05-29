
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData.email.trim());
    }
  };

  const handleForgotPassword = () => {
    // For now, just show an alert - in a real app this would trigger password reset
    alert('Password reset functionality would be implemented here. For demo purposes, you can use any email/password combination.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green-50 to-agri-brown-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-agri-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            🌾
          </div>
          <CardTitle className="text-2xl font-bold text-agri-green-700 dark:text-agri-green-400">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your AgriLink account
            <br />
            <span className="text-sm text-muted-foreground">Continue trading with confidence</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                ✉️ Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                🔒 Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`h-12 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-agri-green-500 hover:bg-agri-green-600"
              disabled={!formData.email.trim() || !formData.password}
            >
              Sign In
            </Button>
          </form>

          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full text-sm text-agri-green-600 hover:text-agri-green-700 hover:bg-agri-green-50"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-agri-green-600 hover:text-agri-green-700"
                  onClick={onSwitchToSignup}
                >
                  Sign Up
                </Button>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="bg-agri-green-100 text-agri-green-800">
                Direct Trade
              </Badge>
              <Badge variant="secondary" className="bg-agri-orange-100 text-agri-orange-800">
                Fair Prices
              </Badge>
              <Badge variant="secondary" className="bg-agri-brown-100 text-agri-brown-800">
                Rural Empowerment
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
