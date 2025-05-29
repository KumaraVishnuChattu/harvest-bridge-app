
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/pages/Index';

interface LoginPageProps {
  onLogin: (name: string, role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      if (!showRoleSelection) {
        setShowRoleSelection(true);
      } else {
        onLogin(name.trim(), selectedRole);
      }
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
            AgriLink
          </CardTitle>
          <CardDescription className="text-base">
            Direct Market Access Platform
            <br />
            <span className="text-sm text-muted-foreground">Connecting Farmers & Buyers</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                required
              />
            </div>
            
            {showRoleSelection && (
              <div className="space-y-3 animate-slide-up">
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
              disabled={!name.trim()}
            >
              {showRoleSelection ? 'Enter AgriLink' : 'Continue'}
            </Button>
          </form>
          
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
