// pages/bookings.tsx
'use client'
import { BookingsScreen } from '@/components/screens/BookingsScreen';

export default function BookingsPage() {
  return (
   
      <BookingsScreen lang="en" onBookingSelect={(id) => console.log('view booking', id)} />

  );
}
