
import React, { useState, useEffect } from 'react';
import { LoginPage } from '@/components/auth/LoginPage';
import { SignupPage } from '@/components/auth/SignupPage';
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
export type AuthMode = 'login' | 'signup';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const { toast } = useToast();

  useEffect(() => {
    // Check if user prefers dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check for existing user session
    const savedUser = localStorage.getItem('agrilink-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUserName(userData.name);
        setUserEmail(userData.email);
        setUserRole(userData.role);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('agrilink-user');
      }
    }
  }, []);

  const handleSignup = (name: string, email: string, role: UserRole) => {
    const userData = { name, email, role };
    
    // Save user data to localStorage
    localStorage.setItem('agrilink-user', JSON.stringify(userData));
    
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    setIsLoggedIn(true);
    
    toast({
      title: "Welcome to AgriLink!",
      description: `Account created successfully as ${role}`,
    });
  };

  const handleLogin = (email: string) => {
    // In a real app, you'd verify credentials here
    // For demo purposes, we'll check if user exists in localStorage or create a demo user
    const savedUser = localStorage.getItem('agrilink-user');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.email === email) {
          setUserName(userData.name);
          setUserEmail(userData.email);
          setUserRole(userData.role);
          setIsLoggedIn(true);
          
          toast({
            title: `Welcome back, ${userData.name}!`,
            description: "Successfully signed in",
          });
          return;
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
    
    // If no saved user or email doesn't match, create a demo user
    const demoName = email.split('@')[0]; // Use part before @ as name
    const demoUserData = { 
      name: demoName.charAt(0).toUpperCase() + demoName.slice(1), 
      email, 
      role: 'farmer' as UserRole 
    };
    
    localStorage.setItem('agrilink-user', JSON.stringify(demoUserData));
    setUserName(demoUserData.name);
    setUserEmail(email);
    setUserRole(demoUserData.role);
    setIsLoggedIn(true);
    
    toast({
      title: `Welcome, ${demoUserData.name}!`,
      description: "Successfully signed in",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('agrilink-user');
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setCurrentPage('dashboard');
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole);
    
    // Update saved user data
    const userData = { name: userName, email: userEmail, role: newRole };
    localStorage.setItem('agrilink-user', JSON.stringify(userData));
    
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
    if (authMode === 'signup') {
      return (
        <SignupPage 
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
    
    return (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthMode('signup')}
      />
    );
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
        return <SettingsPage isDarkMode={isDarkMode} onToggleTheme={toggleTheme} onLogout={handleLogout} />;
      case 'about':
        return <AboutPage userName={userName} />;
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
