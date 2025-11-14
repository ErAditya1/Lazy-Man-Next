import { useState } from 'react';
import { Language, Provider, ServiceCategory, PaymentMethod } from '../../types';
import { t } from '../../lib/translations';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BookingFlowScreenProps {
  provider: Provider;
  lang: Language;
  onBack: () => void;
  onComplete: (bookingData: BookingData) => void;
}

export interface BookingData {
  service: ServiceCategory;
  isASAP: boolean;
  date: string;
  time: string;
  address: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

type Step = 'service' | 'schedule' | 'location' | 'payment' | 'confirm' | 'success';

export function BookingFlowScreen({ provider, lang, onBack, onComplete }: BookingFlowScreenProps) {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<ServiceCategory>(provider.services[0]);
  const [isASAP, setIsASAP] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [notes, setNotes] = useState('');

  const handleNext = () => {
    if (step === 'service') setStep('schedule');
    else if (step === 'schedule') setStep('location');
    else if (step === 'location') setStep('payment');
    else if (step === 'payment') setStep('confirm');
    else if (step === 'confirm') {
      const bookingData: BookingData = {
        service: selectedService,
        isASAP,
        date: isASAP ? new Date().toISOString().split('T')[0] : selectedDate,
        time: isASAP ? 'ASAP' : selectedTime,
        address,
        paymentMethod,
        notes,
      };
      setStep('success');
      setTimeout(() => {
        onComplete(bookingData);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step === 'service') onBack();
    else if (step === 'schedule') setStep('service');
    else if (step === 'location') setStep('schedule');
    else if (step === 'payment') setStep('location');
    else if (step === 'confirm') setStep('payment');
  };

  const canProceed = () => {
    if (step === 'service') return selectedService;
    if (step === 'schedule') return isASAP || (selectedDate && selectedTime);
    if (step === 'location') return address.trim().length > 0;
    if (step === 'payment') return paymentMethod;
    if (step === 'confirm') return true;
    return false;
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[rgb(var(--color-background))] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="mb-2">{t('booking_confirmed', lang)}</h2>
          <p className="text-gray-600">
            {provider.name} will contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  const stepTitles: Record<Exclude<Step, 'success'>, string> = {
    service: t('choose_service', lang),
    schedule: t('schedule', lang),
    location: t('set_location', lang),
    payment: t('payment_method', lang),
    confirm: t('confirm_booking', lang),
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3>{stepTitles[step as Exclude<Step, 'success'>]}</h3>
        </div>
      </div>

      {/* Provider Info */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <ImageWithFallback
            src={provider.photo}
            alt={provider.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4>{provider.name}</h4>
            <p className="text-sm text-gray-600">
              ₹{provider.startingPrice}
              {provider.priceType === 'hourly' ? t('per_hour', lang) : ` ${t('fixed_price', lang)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4">
          {/* Service Selection */}
          {step === 'service' && (
            <div className="space-y-3">
              {provider.services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                    selectedService === service
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{t(service, lang)}</span>
                    {selectedService === service && (
                      <CheckCircle2 className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Schedule */}
          {step === 'schedule' && (
            <div className="space-y-4">
              <button
                onClick={() => setIsASAP(true)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  isASAP
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                    <div>
                      <div>{t('asap', lang)}</div>
                      <div className="text-sm text-gray-400">Available now</div>
                    </div>
                  </div>
                  {isASAP && <CheckCircle2 className="w-5 h-5 text-[rgb(var(--color-primary))]" />}
                </div>
              </button>

              <button
                onClick={() => setIsASAP(false)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  !isASAP
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                    <div>{t('select_date_time', lang)}</div>
                  </div>
                  {!isASAP && <CheckCircle2 className="w-5 h-5 text-[rgb(var(--color-primary))]" />}
                </div>
              </button>

              {!isASAP && (
                <div className="space-y-3 pt-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(var(--color-primary))]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-600">
                      Time
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(var(--color-primary))]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Location */}
          {step === 'location' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Service Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete address..."
                    rows={4}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(var(--color-primary))] resize-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requirements..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgb(var(--color-primary))] resize-none"
                />
              </div>
            </div>
          )}

          {/* Payment Method */}
          {step === 'payment' && (
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  paymentMethod === 'cash'
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💵</div>
                    <div>
                      <div>{t('cash', lang)}</div>
                      <div className="text-sm text-gray-400">Pay after service</div>
                    </div>
                  </div>
                  {paymentMethod === 'cash' && (
                    <CheckCircle2 className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('online')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  paymentMethod === 'online'
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[rgb(var(--color-primary))]" />
                    <div>
                      <div>{t('online_payment', lang)}</div>
                      <div className="text-sm text-gray-400">UPI, Card, Wallet</div>
                    </div>
                  </div>
                  {paymentMethod === 'online' && (
                    <CheckCircle2 className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                  )}
                </div>
              </button>
            </div>
          )}

          {/* Confirmation */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h4 className="mb-3">Booking Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span>{t(selectedService, lang)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Schedule</span>
                    <span>
                      {isASAP
                        ? t('asap', lang)
                        : `${new Date(selectedDate).toLocaleDateString('en-IN')} • ${selectedTime}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment</span>
                    <span>{paymentMethod === 'cash' ? t('cash', lang) : t('online_payment', lang)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="text-gray-600">Estimated Price</span>
                    <span className="text-[rgb(var(--color-primary))]">₹{provider.startingPrice}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                The provider will confirm the final price before starting the service.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full py-3 px-6 rounded-xl bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-dark))] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {step === 'confirm' ? t('confirm_booking', lang) : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
