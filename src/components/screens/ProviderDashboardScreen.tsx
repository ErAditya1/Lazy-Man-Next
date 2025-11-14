'use client'
import { useState } from 'react';
import { Language, Booking } from '../../types';
import { t } from '../../lib/translations';
import { mockBookings } from '../../lib/mockData';
import { DollarSign, Calendar, Clock, CheckCircle, XCircle, ToggleLeft, ToggleRight, User } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProviderDashboardScreenProps {
  lang: Language;
  onProfileClick?: () => void;
}

export function ProviderDashboardScreen({ lang, onProfileClick }: ProviderDashboardScreenProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [requests] = useState<Booking[]>(
    mockBookings.filter((b) => b.status === 'requested')
  );

  const totalEarnings = 12450;
  const thisMonthEarnings = 3200;
  const completedJobs = 47;

  const handleAccept = (bookingId: string) => {
    console.log('Accepted booking:', bookingId);
    // In real app, update booking status
  };

  const handleDecline = (bookingId: string) => {
    console.log('Declined booking:', bookingId);
    // In real app, update booking status
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white px-4 pt-12 pb-6 md:pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-white">Provider Dashboard</h1>
            {onProfileClick && (
              <button
                onClick={onProfileClick}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors md:hidden"
                aria-label="View Profile"
              >
                <User size={20} />
              </button>
            )}
          </div>
          <p className="text-white/90">Manage your bookings and availability</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[rgb(var(--color-primary))]" />
              <span className="text-caption text-gray-400">{t('earnings', lang)}</span>
            </div>
            <div className="text-[rgb(var(--color-primary))]">₹{totalEarnings}</div>
            <div className="text-caption text-gray-400 mt-1">Total</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-caption text-gray-400">This Month</span>
            </div>
            <div className="text-green-600">₹{thisMonthEarnings}</div>
            <div className="text-caption text-gray-400 mt-1">Earnings</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-caption text-gray-400">Jobs</span>
            </div>
            <div className="text-blue-600">{completedJobs}</div>
            <div className="text-caption text-gray-400 mt-1">Completed</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-caption text-gray-400">Pending</span>
            </div>
            <div className="text-orange-600">{requests.length}</div>
            <div className="text-caption text-gray-400 mt-1">Requests</div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1">{t('availability', lang)}</h3>
              <p className="text-sm text-gray-600">
                {isAvailable
                  ? 'You are currently accepting new requests'
                  : 'You are not accepting new requests'}
              </p>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`p-2 rounded-full transition-colors ${
                isAvailable
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isAvailable ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Incoming Requests */}
        <div>
          <h2 className="mb-4">{t('incoming_requests', lang)}</h2>
          {requests.length > 0 ? (
            <div className="space-y-3">
              {requests.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <ImageWithFallback
                      src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                      alt="Customer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1">Customer Request</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {t(booking.service, lang)}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(booking.scheduledDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{booking.scheduledTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[rgb(var(--color-primary))]">₹{booking.price}</div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Address:</strong> {booking.address}
                  </div>

                  {booking.notes && (
                    <div className="text-sm text-gray-600 mb-4">
                      <strong>Notes:</strong> {booking.notes}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(booking.id)}
                      className="flex-1 py-2 px-4 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{t('accept', lang)}</span>
                    </button>
                    <button
                      onClick={() => handleDecline(booking.id)}
                      className="flex-1 py-2 px-4 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{t('decline', lang)}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No pending requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}