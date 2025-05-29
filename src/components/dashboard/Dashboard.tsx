
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/pages/Index';
import { TrendingUp, TrendingDown, MapPin, Plus, Mic } from 'lucide-react';

interface DashboardProps {
  userRole: UserRole;
  userName: string;
}

const popularCrops = [
  { name: 'Red Chilli (Mirchi)', price: '₹180/kg', trend: 'up', region: 'Guntur Special', image: '🌶️' },
  { name: 'Turmeric', price: '₹85/kg', trend: 'up', region: 'Nizamabad', image: '🟡' },
  { name: 'Cotton', price: '₹6,200/quintal', trend: 'down', region: 'Warangal', image: '🤍' },
  { name: 'Rice (Basmati)', price: '₹45/kg', trend: 'up', region: 'Krishna Delta', image: '🌾' },
  { name: 'Onions', price: '₹28/kg', trend: 'down', region: 'Kurnool', image: '🧅' },
  { name: 'Tomatoes', price: '₹35/kg', trend: 'up', region: 'Rangareddy', image: '🍅' },
];

const recentActivity = [
  { type: 'price_alert', message: 'Mirchi prices increased by 5%', time: '2 hours ago' },
  { type: 'chat', message: 'New message from buyer in Hyderabad', time: '4 hours ago' },
  { type: 'listing', message: 'Your tomato listing got 3 new inquiries', time: '6 hours ago' },
];

export const Dashboard: React.FC<DashboardProps> = ({ userRole, userName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 p-4">
      {/* Greeting Card */}
      <Card className="bg-gradient-to-r from-agri-green-500 to-agri-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {getGreeting()}, {userName}!
              </h2>
              <p className="text-green-100 mt-1">
                {userRole === 'farmer' 
                  ? 'Ready to showcase your harvest?' 
                  : 'Find the best crops directly from farmers'
                }
              </p>
            </div>
            <div className="text-4xl">
              {userRole === 'farmer' ? '👨‍🌾' : '🏢'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="h-20 flex flex-col space-y-2 bg-agri-orange-500 hover:bg-agri-orange-600"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm">
            {userRole === 'farmer' ? 'Post Crop' : 'Find Crops'}
          </span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex flex-col space-y-2 border-agri-green-200 hover:bg-agri-green-50"
        >
          <Mic className="w-6 h-6" />
          <span className="text-sm">Voice Search</span>
        </Button>
      </div>

      {/* Location & Market Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <MapPin className="w-5 h-5 text-agri-green-600" />
            <span>Popular Crops in Your Region</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularCrops.slice(0, 4).map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{crop.image}</span>
                  <div>
                    <p className="font-medium">{crop.name}</p>
                    <p className="text-sm text-muted-foreground">{crop.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{crop.price}</p>
                  <div className="flex items-center space-x-1">
                    {crop.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs ${crop.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {crop.trend === 'up' ? '+5%' : '-3%'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {userRole === 'farmer' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'price_alert' ? 'bg-green-500' :
                    activity.type === 'chat' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-agri-green-600">2,341</div>
            <div className="text-sm text-muted-foreground">Active Farmers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-agri-orange-600">847</div>
            <div className="text-sm text-muted-foreground">Verified Buyers</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
