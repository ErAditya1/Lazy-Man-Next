import { Provider, Review, Booking, ServiceCategory } from '../types';

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    photo: 'https://i.pravatar.cc/150?img=12',
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    distance: 1.2,
    services: ['plumber'],
    startingPrice: 300,
    bio: 'Experienced plumber with 10+ years. Specialist in pipeline repairs, bathroom fittings, and water heater installations.',
    workSamples: [
      'https://images.unsplash.com/photo-1731694411560-050e5b91e943?w=400',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
    ],
    availability: true,
    phoneNumber: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    priceType: 'hourly',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place, New Delhi'
    }
  },
  {
    id: '2',
    name: 'Amit Singh',
    photo: 'https://i.pravatar.cc/150?img=33',
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    distance: 0.8,
    services: ['electrician'],
    startingPrice: 350,
    bio: 'Licensed electrician specializing in home wiring, fan installations, and electrical repairs. Available 24/7 for emergencies.',
    workSamples: [
      'https://images.unsplash.com/photo-1655069705106-d22e4d45ce53?w=400',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
    ],
    availability: true,
    phoneNumber: '+91 98765 43211',
    whatsapp: '+91 98765 43211',
    priceType: 'hourly',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Karol Bagh, New Delhi'
    }
  },
  {
    id: '3',
    name: 'Sunita Devi',
    photo: 'https://i.pravatar.cc/150?img=47',
    rating: 4.7,
    reviewCount: 89,
    verified: true,
    distance: 1.5,
    services: ['maid', 'cleaner'],
    startingPrice: 4000,
    bio: 'Professional house cleaning and maid services. Reliable, punctual, and thorough. Monthly packages available.',
    workSamples: [
      'https://images.unsplash.com/photo-1620563671147-979557991e5a?w=400',
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400',
    ],
    availability: true,
    phoneNumber: '+91 98765 43212',
    priceType: 'fixed',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Lajpat Nagar, New Delhi'
    }
  },
  {
    id: '4',
    name: 'Vikram Sharma',
    photo: 'https://i.pravatar.cc/150?img=15',
    rating: 4.6,
    reviewCount: 156,
    verified: true,
    distance: 2.3,
    services: ['carpenter'],
    startingPrice: 400,
    bio: 'Expert carpenter for furniture repair, custom woodwork, and interior carpentry. Quality work guaranteed.',
    workSamples: [
      'https://images.unsplash.com/photo-1670838895005-e73fad7f59af?w=400',
      'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400',
    ],
    availability: false,
    phoneNumber: '+91 98765 43213',
    whatsapp: '+91 98765 43213',
    priceType: 'hourly',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Vasant Kunj, New Delhi'
    }
  },
  {
    id: '5',
    name: 'Ramesh Yadav',
    photo: 'https://i.pravatar.cc/150?img=51',
    rating: 4.5,
    reviewCount: 92,
    verified: false,
    distance: 3.1,
    services: ['painter'],
    startingPrice: 320,
    bio: 'Professional painting services for interior and exterior. Free color consultation included.',
    workSamples: [
      'https://images.unsplash.com/photo-1745092707630-c00ef0a006c4?w=400',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
    ],
    availability: true,
    phoneNumber: '+91 98765 43214',
    priceType: 'hourly',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Rohini, New Delhi'
    }
  },
  {
    id: '6',
    name: 'Deepak Verma',
    photo: 'https://i.pravatar.cc/150?img=68',
    rating: 4.4,
    reviewCount: 67,
    verified: true,
    distance: 1.9,
    services: ['peon'],
    startingPrice: 8000,
    bio: 'Reliable office peon and assistant. Available for full-time or part-time work.',
    workSamples: [],
    availability: true,
    phoneNumber: '+91 98765 43215',
    priceType: 'fixed',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Dwarka, New Delhi'
    }
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Priya Malhotra',
    userPhoto: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'Excellent service! Very professional and fixed the issue quickly. Highly recommend.',
    date: '2024-11-01',
    providerId: '1'
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Arjun Mehta',
    userPhoto: 'https://i.pravatar.cc/150?img=8',
    rating: 4,
    comment: 'Good work. Came on time and was very polite. Will hire again.',
    date: '2024-10-28',
    providerId: '1'
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Sneha Kapoor',
    userPhoto: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    comment: 'Amazing electrician! Fixed all wiring issues and explained everything clearly.',
    date: '2024-11-05',
    providerId: '2'
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'Rohit Gupta',
    userPhoto: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    comment: 'Very satisfied with the cleaning service. Sunita is very thorough and trustworthy.',
    date: '2024-10-30',
    providerId: '3'
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    providerId: '1',
    provider: mockProviders[0],
    userId: 'currentUser',
    service: 'plumber',
    status: 'in_progress',
    scheduledDate: '2024-11-12',
    scheduledTime: '14:00',
    address: '123 Main Street, New Delhi',
    location: {
      lat: 28.6139,
      lng: 77.2090
    },
    price: 600,
    paymentMethod: 'cash',
    createdAt: '2024-11-12T10:00:00Z',
    notes: 'Kitchen sink leaking'
  },
  {
    id: 'b2',
    providerId: '2',
    provider: mockProviders[1],
    userId: 'currentUser',
    service: 'electrician',
    status: 'completed',
    scheduledDate: '2024-11-10',
    scheduledTime: '10:00',
    address: '456 Park Avenue, New Delhi',
    location: {
      lat: 28.6139,
      lng: 77.2090
    },
    price: 700,
    paymentMethod: 'online',
    createdAt: '2024-11-10T08:00:00Z',
    notes: 'Fan installation'
  },
];

export const categoryIcons: Record<ServiceCategory, string> = {
  plumber: '🔧',
  electrician: '⚡',
  maid: '🧹',
  carpenter: '🪚',
  painter: '🎨',
  peon: '📋',
  cleaner: '🧼',
  gardener: '🌱'
};

export const categoryImages: Record<ServiceCategory, string> = {
  plumber: 'https://images.unsplash.com/photo-1731694411560-050e5b91e943?w=400',
  electrician: 'https://images.unsplash.com/photo-1655069705106-d22e4d45ce53?w=400',
  maid: 'https://images.unsplash.com/photo-1620563671147-979557991e5a?w=400',
  carpenter: 'https://images.unsplash.com/photo-1670838895005-e73fad7f59af?w=400',
  painter: 'https://images.unsplash.com/photo-1745092707630-c00ef0a006c4?w=400',
  peon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
  cleaner: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400',
  gardener: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
};

// Mock Customer User
export const mockCustomerUser = {
  id: 'currentUser',
  name: 'Priya Malhotra',
  phone: '+91 98765 12345',
  email: 'priya.malhotra@example.com',
  photo: 'https://i.pravatar.cc/150?img=5',
  savedAddresses: [
    {
      id: 'addr1',
      label: 'Home',
      address: '123 Main Street, Connaught Place, New Delhi',
      lat: 28.6139,
      lng: 77.2090,
    },
    {
      id: 'addr2',
      label: 'Office',
      address: '456 Park Avenue, Karol Bagh, New Delhi',
      lat: 28.6500,
      lng: 77.1900,
    }
  ],
  preferences: {
    notifications: {
      bookingUpdates: true,
      promotionalOffers: false,
    },
  },
};

// Mock Provider User (for provider account view)
export const mockProviderUser = {
  ...mockProviders[0],
  email: 'rajesh.kumar@example.com',
  totalEarnings: 45600,
  monthlyEarnings: 12400,
  totalJobs: 127,
  completedJobs: 118,
  preferences: {
    notifications: {
      bookingUpdates: true,
      promotionalOffers: true,
    },
  },
};