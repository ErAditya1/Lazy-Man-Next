import { Language, Provider } from '../../types';
import { t } from '../../lib/translations';
import { mockReviews } from '../../lib/mockData';
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProviderProfileScreenProps {
  provider: Provider;
  lang: Language;
  onBack: () => void;
  onBook: () => void;
}

export function ProviderProfileScreen({
  provider,
  lang,
  onBack,
  onBook,
}: ProviderProfileScreenProps) {
  const providerReviews = mockReviews.filter((r) => r.providerId === provider.id);

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3>{t('view_profile', lang)}</h3>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Provider Header */}
        <div className="bg-white p-6 border-b border-gray-100">
          <div className="flex gap-4 mb-4">
            <div className="relative">
              <ImageWithFallback
                src={provider.photo}
                alt={provider.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="mb-1">{provider.name}</h2>
                  {provider.verified && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t('verified', lang)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{provider.rating}</span>
                  <span className="text-sm text-gray-400">
                    ({provider.reviewCount})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {provider.distance} {t('km_away', lang)}
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                  provider.availability
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{provider.availability ? t('online', lang) : t('offline', lang)}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-600 mb-1">
              {t('starting_from', lang)}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[rgb(var(--color-primary))]">₹{provider.startingPrice}</span>
              <span className="text-sm text-gray-400">
                {provider.priceType === 'hourly' ? t('per_hour', lang) : t('fixed_price', lang)}
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white p-6 border-b border-gray-100">
          <h3 className="mb-3">{t('categories', lang)}</h3>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] rounded-full text-sm"
              >
                {t(service, lang)}
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        {provider.bio && (
          <div className="bg-white p-6 border-b border-gray-100">
            <h3 className="mb-3">{t('about', lang)}</h3>
            <p className="text-gray-600">{provider.bio}</p>
          </div>
        )}

        {/* Work Samples */}
        {provider.workSamples.length > 0 && (
          <div className="bg-white p-6 border-b border-gray-100">
            <h3 className="mb-3">{t('work_samples', lang)}</h3>
            <div className="grid grid-cols-2 gap-3">
              {provider.workSamples.map((sample, index) => (
                <ImageWithFallback
                  key={index}
                  src={sample}
                  alt={`Work sample ${index + 1}`}
                  className="w-full aspect-square rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {providerReviews.length > 0 && (
          <div className="bg-white p-6">
            <h3 className="mb-4">{t('reviews', lang)}</h3>
            <div className="space-y-4">
              {providerReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3 mb-2">
                    <ImageWithFallback
                      src={review.userPhoto}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm">{review.userName}</h4>
                        <span className="text-caption text-gray-400">
                          {new Date(review.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:pb-4 pb-20 z-10">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            onClick={() => window.location.href = `tel:${provider.phoneNumber}`}
            className="flex-shrink-0 p-3 rounded-xl border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/5 transition-colors"
            aria-label={t('call', lang)}
          >
            <Phone className="w-5 h-5" />
          </button>
          {provider.whatsapp && (
            <button
              onClick={() =>
                window.open(`https://wa.me/${provider.whatsapp!.replace(/[^0-9]/g, '')}`, '_blank')
              }
              className="flex-shrink-0 p-3 rounded-xl border-2 border-green-500 text-green-500 hover:bg-green-50 transition-colors"
              aria-label={t('message', lang)}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onBook}
            className="flex-1 py-3 px-6 rounded-xl bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-dark))] transition-colors"
          >
            {t('book_now', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
