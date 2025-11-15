import { Booking, Language } from '../types';
import { t } from '../lib/translations';
import { Clock, MapPin, Phone, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingCardProps {
  booking: Booking;
  lang: Language;
  onClick?: () => void;
}

const statusColors = {
  requested: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  in_progress: 'bg-orange-100 text-orange-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function BookingCard({ booking, lang, onClick }: BookingCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3 mb-3">
        <ImageWithFallback
          src={booking.provider.photo}
          alt={booking.provider.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4>{booking.provider.name}</h4>
          <p className="text-sm text-gray-600">
            {t(booking.service, lang)}
          </p>
        </div>
        <span className={`px-2 py-1 rounded text-caption ${statusColors[booking.status]}`}>
          {t(booking.status, lang)}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            {new Date(booking.scheduledDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}{' '}
            • {booking.scheduledTime}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{booking.address}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div>
          <span className="text-[rgb(var(--color-primary))]">₹{booking.price}</span>
          <span className="text-caption text-gray-400 ml-1">
            • {booking.paymentMethod === 'cash' ? t('cash', lang) : t('online_payment', lang)}
          </span>
        </div>

        {booking.status === 'in_progress' && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${booking.provider.phoneNumber}`;
              }}
              className="p-2 rounded-lg bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-dark))] transition-colors"
              aria-label={t('call', lang)}
            >
              <Phone className="w-3 h-3" />
            </button>
            {booking.provider.whatsapp && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/${booking.provider.whatsapp?.replace(/[^0-9]/g, '')}`, '_blank');
                }}
                className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                aria-label={t('message', lang)}
              >
                <MessageCircle className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}