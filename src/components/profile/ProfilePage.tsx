
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/pages/Index';
import { MapPin, Calendar, Phone, Mail, Edit, Star, Award } from 'lucide-react';

interface ProfilePageProps {
  userRole: UserRole;
  userName: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userRole, userName }) => {
  const farmerProfile = {
    name: userName,
    role: userRole,
    location: 'Guntur, Andhra Pradesh',
    joinDate: 'January 2024',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    farmSize: '15 acres',
    crops: ['Red Chilli', 'Turmeric', 'Cotton', 'Rice'],
    rating: 4.8,
    totalSales: '₹2,45,000',
    completedOrders: 47,
    certifications: ['Organic Farming', 'Good Agricultural Practices']
  };

  const buyerProfile = {
    name: userName,
    role: userRole,
    location: 'Hyderabad, Telangana',
    joinDate: 'January 2024',
    phone: '+91 98765 43210',
    email: 'buyer@agrifoods.com',
    company: 'Agri Foods Ltd',
    businessType: 'Wholesale Trading',
    rating: 4.9,
    totalPurchases: '₹5,67,000',
    completedOrders: 23,
    verifications: ['GST Verified', 'Trade License', 'Bank Verified']
  };

  const profile = userRole === 'farmer' ? farmerProfile : buyerProfile;

  return (
    <div className="space-y-6 p-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-agri-green-100 rounded-full flex items-center justify-center text-3xl">
              {userRole === 'farmer' ? '👨‍🌾' : '🏢'}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              
              <Badge 
                className={`mt-2 ${
                  userRole === 'farmer' 
                    ? 'bg-agri-green-500 hover:bg-agri-green-600' 
                    : 'bg-agri-orange-500 hover:bg-agri-orange-600 text-white'
                }`}
              >
                {userRole === 'farmer' ? '👨‍🌾 Farmer' : '🏢 Buyer'}
              </Badge>
              
              <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile.joinDate}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{profile.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({profile.completedOrders} orders)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span>{profile.email}</span>
          </div>
        </CardContent>
      </Card>

      {/* Business/Farm Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {userRole === 'farmer' ? 'Farm Information' : 'Business Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userRole === 'farmer' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Farm Size</p>
                  <p className="font-semibold">{farmerProfile.farmSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="font-semibold text-agri-green-600">{farmerProfile.totalSales}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Primary Crops</p>
                <div className="flex flex-wrap gap-2">
                  {farmerProfile.crops.map((crop, index) => (
                    <Badge key={index} variant="secondary">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-semibold">{buyerProfile.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="font-semibold">{buyerProfile.businessType}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
                <p className="font-semibold text-agri-green-600">{buyerProfile.totalPurchases}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Certifications/Verifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>
              {userRole === 'farmer' ? 'Certifications' : 'Verifications'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(userRole === 'farmer' ? farmerProfile.certifications : buyerProfile.verifications).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  Verified
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-agri-green-600">{profile.completedOrders}</div>
            <div className="text-sm text-muted-foreground">Completed Orders</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-agri-orange-600">{profile.rating}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
