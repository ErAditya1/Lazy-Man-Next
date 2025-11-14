import { Provider, Language } from '../types';
import { Star, MapPin, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { t } from '../lib/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProviderCardProps {
  provider: Provider;
  lang: Language;
  onClick?: () => void;
}

export function ProviderCard({ provider, lang, onClick }: ProviderCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="flex gap-3 p-4">
        {/* Provider Photo */}
        <div className="relative shrink-0">
          <ImageWithFallback
            src={provider.photo}
            alt={provider.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          {provider.verified && (
            <div className="absolute -top-1 -right-1 bg-green-600 rounded-full p-1">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Provider Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="truncate">{provider.name}</h3>
            <div
              className={`px-2 py-0.5 rounded-full text-caption ${
                provider.availability
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {provider.availability ? t('online', lang) : t('offline', lang)}
            </div>
          </div>

          {/* Rating & Distance */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-900">
                {provider.rating}
              </span>
              <span className="text-caption text-gray-400">
                ({provider.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1 text-caption text-gray-600">
              <MapPin className="w-3 h-3" />
              <span>
                {provider.distance} {t('km_away', lang)}
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-1 mb-2">
            {provider.services.slice(0, 2).map((service) => (
              <span
                key={service}
                className="px-2 py-0.5 bg-gray-50 text-caption text-gray-600 rounded"
              >
                {t(service, lang)}
              </span>
            ))}
            {provider.services.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-50 text-caption text-gray-600 rounded">
                +{provider.services.length - 2}
              </span>
            )}
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[rgb(var(--color-primary))]">₹{provider.startingPrice}</span>
              <span className="text-caption text-gray-400">
                {provider.priceType === 'hourly' ? t('per_hour', lang) : ` ${t('fixed_price', lang)}`}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${provider.phoneNumber}`;
                }}
                className="p-2 rounded-lg bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-dark))] transition-colors"
                aria-label={t('call', lang)}
              >
                <Phone className="w-4 h-4" />
              </button>
              {provider.whatsapp && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://wa.me/${provider?.whatsapp?.replace(/[^0-9]/g, '')}`, '_blank');
                  }}
                  className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                  aria-label={t('message', lang)}
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}