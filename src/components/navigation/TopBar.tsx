
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserRole, Page } from '@/pages/Index';
import { Bell, MapPin, Menu } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
  userName: string;
  userRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  userName,
  userRole,
  onRoleSwitch,
  currentPage,
  onPageChange
}) => {
  console.log('TopBar rendered for user:', userName, 'role:', userRole);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🌾</div>
          <div>
            <h1 className="text-lg font-bold text-agri-green-700 dark:text-agri-green-400">
              AgriLink
            </h1>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Guntur, AP</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onPageChange('about')}>
                About AgriLink
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onRoleSwitch(userRole === 'farmer' ? 'buyer' : 'farmer')}
              >
                Switch to {userRole === 'farmer' ? 'Buyer' : 'Farmer'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="font-semibold">{userName}</p>
          </div>
          <Badge 
            variant={userRole === 'farmer' ? 'default' : 'secondary'}
            className={userRole === 'farmer' 
              ? 'bg-agri-green-500 hover:bg-agri-green-600' 
              : 'bg-agri-orange-500 hover:bg-agri-orange-600 text-white'
            }
          >
            {userRole === 'farmer' ? '👨‍🌾 Farmer' : '🏢 Buyer'}
          </Badge>
        </div>
      </div>
    </header>
  );
};
