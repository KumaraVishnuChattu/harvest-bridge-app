
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/pages/Index';
import { Search, Filter, MapPin, Phone, MessageCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CropListingsProps {
  userRole: UserRole;
}

const cropListings = [
  {
    id: 1,
    name: 'Premium Red Chilli',
    variety: 'Guntur Sannam',
    price: '₹180/kg',
    quantity: '500 kg',
    farmer: 'Ramesh Kumar',
    location: 'Guntur, AP',
    image: '🌶️',
    quality: 'Grade A',
    harvestDate: '2024-01-15',
    description: 'Fresh harvest, sun-dried, high spice content'
  },
  {
    id: 2,
    name: 'Organic Turmeric',
    variety: 'Nizamabad Bulb',
    price: '₹85/kg',
    quantity: '200 kg',
    farmer: 'Lakshmi Devi',
    location: 'Nizamabad, TS',
    image: '🟡',
    quality: 'Organic',
    harvestDate: '2024-01-10',
    description: 'Certified organic, high curcumin content'
  },
  {
    id: 3,
    name: 'Basmati Rice',
    variety: 'Pusa Basmati 1121',
    price: '₹45/kg',
    quantity: '1000 kg',
    farmer: 'Suresh Reddy',
    location: 'Krishna, AP',
    image: '🌾',
    quality: 'Premium',
    harvestDate: '2024-01-12',
    description: 'Long grain, aromatic, perfect for export'
  },
  {
    id: 4,
    name: 'Fresh Tomatoes',
    variety: 'Hybrid',
    price: '₹35/kg',
    quantity: '300 kg',
    farmer: 'Prasad Rao',
    location: 'Rangareddy, TS',
    image: '🍅',
    quality: 'Grade A',
    harvestDate: '2024-01-18',
    description: 'Firm, red, perfect for retail'
  },
  {
    id: 5,
    name: 'White Onions',
    variety: 'Bellary Red',
    price: '₹28/kg',
    quantity: '800 kg',
    farmer: 'Manjula Rani',
    location: 'Kurnool, AP',
    image: '🧅',
    quality: 'Grade B',
    harvestDate: '2024-01-14',
    description: 'Good storage life, medium size'
  },
  {
    id: 6,
    name: 'Cotton Bales',
    variety: 'Bt Cotton',
    price: '₹6,200/quintal',
    quantity: '50 quintals',
    farmer: 'Venkat Reddy',
    location: 'Warangal, TS',
    image: '🤍',
    quality: 'Premium',
    harvestDate: '2024-01-08',
    description: 'High fiber strength, machine picked'
  }
];

export const CropListings: React.FC<CropListingsProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCrops, setFilteredCrops] = useState(cropListings);
  const { toast } = useToast();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = cropListings.filter(crop =>
      crop.name.toLowerCase().includes(term.toLowerCase()) ||
      crop.farmer.toLowerCase().includes(term.toLowerCase()) ||
      crop.location.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCrops(filtered);
  };

  const handleContact = (farmer: string, method: string) => {
    toast({
      title: `Contacting ${farmer}`,
      description: `Opening ${method} to connect with farmer`,
    });
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {userRole === 'farmer' ? 'My Crop Listings' : 'Available Crops'}
        </h2>
        {userRole === 'farmer' && (
          <Button className="bg-agri-green-500 hover:bg-agri-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Crop
          </Button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search crops, farmers, locations..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="crop-card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{crop.image}</span>
                  <div>
                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{crop.variety}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-agri-green-100 text-agri-green-800">
                  {crop.quality}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-semibold text-lg text-agri-green-600">{crop.price}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-semibold">{crop.quantity}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{crop.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">{crop.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-sm font-medium">{crop.farmer}</p>
                  <p className="text-xs text-muted-foreground">
                    Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
                  </p>
                </div>
                
                {userRole === 'buyer' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContact(crop.farmer, 'phone')}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-agri-green-500 hover:bg-agri-green-600"
                      onClick={() => handleContact(crop.farmer, 'chat')}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No crops found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};
