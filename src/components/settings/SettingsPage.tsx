
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  Mic, 
  Volume2, 
  Shield, 
  HelpCircle,
  LogOut,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, onToggleTheme }) => {
  const [notifications, setNotifications] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState('english');
  const { toast } = useToast();

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    toast({
      title: `Notifications ${!notifications ? 'Enabled' : 'Disabled'}`,
      description: !notifications 
        ? 'You will receive updates about crops, chats, and market prices' 
        : 'You will not receive push notifications',
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language Updated",
      description: `Interface language changed to ${value}`,
    });
  };

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'malayalam', name: 'Malayalam', native: 'മലയാളം' }
  ];

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Settings</h2>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={onToggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Language & Region</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium mb-2">Interface Language</p>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center justify-between w-full">
                      <span>{lang.name}</span>
                      <span className="text-muted-foreground ml-2">{lang.native}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get alerts for new chats, crop updates, and price changes
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={handleNotificationToggle}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm">Chat Messages</span>
              <Switch checked={notifications} disabled={!notifications} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Price Alerts</span>
              <Switch checked={notifications} disabled={!notifications} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">New Crop Listings</span>
              <Switch checked={notifications} disabled={!notifications} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice & Audio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>Voice & Audio</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Voice Input</p>
              <p className="text-sm text-muted-foreground">
                Use voice to search and navigate
              </p>
            </div>
            <Switch
              checked={voiceEnabled}
              onCheckedChange={setVoiceEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound Effects</p>
              <p className="text-sm text-muted-foreground">
                Play sounds for notifications and interactions
              </p>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Settings
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Smartphone className="w-4 h-4 mr-2" />
            Data Usage
          </Button>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ & Help Center
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            Contact Support
          </Button>
          
          <div className="pt-3 border-t">
            <p className="text-sm text-muted-foreground">
              App Version: 1.0.0 (Build 2024.01)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardContent className="p-4">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
