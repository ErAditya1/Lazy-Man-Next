import { Language } from '../../types';
import { t } from '../../lib/translations';
import { mockBookings } from '../../lib/mockData';
import { BookingCard } from '../BookingCard';
import { Calendar } from 'lucide-react';

interface BookingsScreenProps {
  lang: Language;
  onBookingSelect: (bookingId: string) => void;
}

export function BookingsScreen({ lang, onBookingSelect }: BookingsScreenProps) {
  const activeBookings = mockBookings.filter(
    (b) => b.status === 'requested' || b.status === 'accepted' || b.status === 'in_progress'
  );
  const pastBookings = mockBookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 md:top-16">
        <div className="max-w-7xl mx-auto">
          <h2>{t('my_bookings', lang)}</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {activeBookings.length === 0 && pastBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="mb-2">{t('no_bookings', lang)}</h3>
            <p className="text-gray-600 max-w-sm">
              Your bookings will appear here once you book a service.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div>
                <h3 className="mb-3">Active</h3>
                <div className="space-y-3">
                  {activeBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      lang={lang}
                      onClick={() => onBookingSelect(booking.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h3 className="mb-3">Past</h3>
                <div className="space-y-3">
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      lang={lang}
                      onClick={() => onBookingSelect(booking.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}