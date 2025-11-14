export type Language = 'en' | 'hi';

export type ServiceCategory = 
  | 'plumber'
  | 'electrician'
  | 'maid'
  | 'carpenter'
  | 'painter'
  | 'peon'
  | 'cleaner'
  | 'gardener';

export type BookingStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export type PaymentMethod = 'cash' | 'online';

export interface Provider {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  distance: number;
  services: ServiceCategory[];
  startingPrice: number;
  bio: string;
  workSamples: string[];
  availability: boolean;
  phoneNumber: string;
  whatsapp?: string;
  priceType: 'hourly' | 'fixed';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  date: string;
  providerId: string;
}

export interface Booking {
  id: string;
  providerId: string;
  provider: Provider;
  userId: string;
  service: ServiceCategory;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  photo?: string;
}
