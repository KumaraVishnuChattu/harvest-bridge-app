
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/pages/Index';
import { Eye, EyeOff } from 'lucide-react';

interface SignupPageProps {
  onSignup: (name: string, email: string, role: UserRole) => void;
  onSwitchToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    // Real-time password match validation
    if (field === 'confirmPassword' || field === 'password') {
      if (field === 'confirmPassword' && formData.password !== value) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (field === 'password' && formData.confirmPassword && formData.confirmPassword !== value) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showRoleSelection) {
      if (validateForm()) {
        setShowRoleSelection(true);
      }
    } else {
      onSignup(formData.name.trim(), formData.email.trim(), selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green-50 to-agri-brown-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-agri-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            🌾
          </div>
          <CardTitle className="text-2xl font-bold text-agri-green-700 dark:text-agri-green-400">
            Join AgriLink
          </CardTitle>
          <CardDescription className="text-base">
            Create your account to start trading
            <br />
            <span className="text-sm text-muted-foreground">Connect directly with farmers & buyers</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!showRoleSelection ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    👤 Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

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
                      placeholder="Create a password"
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

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    🔒 Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`h-12 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <label className="text-sm font-medium">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={selectedRole === 'farmer' ? 'default' : 'outline'}
                    className={`h-20 flex flex-col space-y-2 ${
                      selectedRole === 'farmer' 
                        ? 'bg-agri-green-500 hover:bg-agri-green-600' 
                        : 'hover:bg-agri-green-50'
                    }`}
                    onClick={() => setSelectedRole('farmer')}
                  >
                    <span className="text-2xl">👨‍🌾</span>
                    <span className="text-sm">Farmer</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant={selectedRole === 'buyer' ? 'default' : 'outline'}
                    className={`h-20 flex flex-col space-y-2 ${
                      selectedRole === 'buyer' 
                        ? 'bg-agri-green-500 hover:bg-agri-green-600' 
                        : 'hover:bg-agri-green-50'
                    }`}
                    onClick={() => setSelectedRole('buyer')}
                  >
                    <span className="text-2xl">🏢</span>
                    <span className="text-sm">Buyer</span>
                  </Button>
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-agri-green-500 hover:bg-agri-green-600"
              disabled={!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword}
            >
              {showRoleSelection ? 'Create Account' : 'Continue'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-agri-green-600 hover:text-agri-green-700"
                onClick={onSwitchToLogin}
              >
                Sign In
              </Button>
            </p>
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
