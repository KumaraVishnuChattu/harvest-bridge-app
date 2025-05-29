
import React, { useState, useEffect } from 'react';
import { LoginPage } from '@/components/auth/LoginPage';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { CropListings } from '@/components/crops/CropListings';
import { ChatSystem } from '@/components/chat/ChatSystem';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { SettingsPage } from '@/components/settings/SettingsPage';
import { AboutPage } from '@/components/about/AboutPage';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { TopBar } from '@/components/navigation/TopBar';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'farmer' | 'buyer';
export type Page = 'dashboard' | 'crops' | 'chat' | 'profile' | 'settings' | 'about';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Check if user prefers dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = (name: string, role: UserRole) => {
    setUserName(name);
    setUserRole(role);
    setIsLoggedIn(true);
    toast({
      title: "Welcome to AgriLink!",
      description: `Logged in as ${role}`,
    });
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole);
    toast({
      title: "Role Switched",
      description: `Now viewing as ${newRole}`,
    });
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} userName={userName} />;
      case 'crops':
        return <CropListings userRole={userRole} />;
      case 'chat':
        return <ChatSystem userRole={userRole} userName={userName} />;
      case 'profile':
        return <ProfilePage userRole={userRole} userName={userName} />;
      case 'settings':
        return <SettingsPage isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
      case 'about':
        return <AboutPage />;
      default:
        return <Dashboard userRole={userRole} userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar 
        userName={userName}
        userRole={userRole}
        onRoleSwitch={handleRoleSwitch}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main className="pb-20 pt-16">
        {renderCurrentPage()}
      </main>
      
      <BottomNavigation 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userRole={userRole}
      />
    </div>
  );
};

export default Index;
