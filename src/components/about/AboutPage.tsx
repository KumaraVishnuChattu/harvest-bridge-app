
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, TrendingUp, Shield, Award, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  userName?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ userName }) => {
  const features = [
    {
      icon: Users,
      title: 'Direct Connection',
      description: 'Connect farmers and buyers directly, eliminating middlemen and ensuring fair prices.'
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Real-time crop prices, demand trends, and regional market insights.'
    },
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Verified users, secure payments, and quality assurance for all transactions.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Grade verification, freshness tracking, and quality certifications.'
    }
  ];

  const stats = [
    { number: '2,341', label: 'Active Farmers', color: 'text-agri-green-600' },
    { number: '847', label: 'Verified Buyers', color: 'text-agri-orange-600' },
    { number: '₹45L+', label: 'Trade Volume', color: 'text-agri-brown-600' },
    { number: '89%', label: 'Farmer Satisfaction', color: 'text-agri-green-600' }
  ];

  const team = [
    { role: 'Agriculture Expert', name: 'Dr. Rajesh Kumar' },
    { role: 'Technology Lead', name: 'Priya Sharma' },
    { role: 'Market Analyst', name: 'Suresh Reddy' },
    { role: 'Rural Development', name: 'Lakshmi Devi' }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-agri-green-500 to-agri-green-600 text-white">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h1 className="text-2xl font-bold mb-2">AgriLink</h1>
          <p className="text-green-100 mb-4">
            {userName ? `Welcome to AgriLink, ${userName}!` : 'Empowering farmers, enabling direct trade, ensuring fair prices'}
          </p>
          <Badge className="bg-white text-agri-green-700">
            Direct Market Access Platform
          </Badge>
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Our Mission</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            AgriLink is dedicated to transforming agriculture by creating direct connections between farmers and buyers. 
            We believe in restoring faith in farming by making it profitable, reliable, and sustainable. Our platform 
            eliminates middlemen, ensures fair pricing, and empowers rural communities with technology that's accessible 
            to everyone, regardless of education level.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Why Choose AgriLink?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-agri-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-agri-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Our Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How AgriLink Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-agri-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold">Register & Verify</h3>
                <p className="text-sm text-muted-foreground">
                  Create your profile as a farmer or buyer and get verified through our secure process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-agri-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold">List or Browse Crops</h3>
                <p className="text-sm text-muted-foreground">
                  Farmers list their produce while buyers browse available crops with real-time pricing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-agri-brown-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold">Connect & Trade</h3>
                <p className="text-sm text-muted-foreground">
                  Direct communication through our chat system leads to fair, transparent transactions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {team.map((member, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-agri-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Our Website
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              📧 Email Support
            </Button>
            <Button variant="outline" size="sm">
              📞 Call Us
            </Button>
          </div>
          
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for Indian farmers
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © 2024 AgriLink. Empowering rural India.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
