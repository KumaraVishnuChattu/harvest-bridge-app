
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, List, MessageCircle, User, Settings } from 'lucide-react';
import { UserRole, Page } from '@/pages/Index';

interface BottomNavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  userRole: UserRole;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onPageChange,
  userRole
}) => {
  console.log('BottomNavigation rendered with currentPage:', currentPage);
  
  const navItems = [
    {
      id: 'dashboard' as Page,
      icon: Home,
      label: 'Home',
    },
    {
      id: 'crops' as Page,
      icon: List,
      label: userRole === 'farmer' ? 'My Crops' : 'Browse',
    },
    {
      id: 'chat' as Page,
      icon: MessageCircle,
      label: 'Chat',
    },
    {
      id: 'profile' as Page,
      icon: User,
      label: 'Profile',
    },
    {
      id: 'settings' as Page,
      icon: Settings,
      label: 'Settings',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 ${
                isActive 
                  ? 'text-agri-green-600 bg-agri-green-50 dark:text-agri-green-400 dark:bg-agri-green-900/20' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-agri-green-600 dark:text-agri-green-400' : ''}`} />
              <span className={`text-xs truncate ${isActive ? 'font-medium' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
