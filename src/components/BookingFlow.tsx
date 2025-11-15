import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, MapPin, ChevronRight,
  CreditCard, Wallet, Check, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM'
];

export default function BookingFlow() {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [step, setStep] = useState<'service' | 'datetime' | 'address' | 'payment' | 'confirm'>();
  
  const [selectedService, setSelectedService] = useState('');
  const [bookingType, setBookingType] = useState<'asap' | 'scheduled'>('asap');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [loading, setLoading] = useState(false);

  const services = [
    { id: '1', name: 'Pipe Leak Repair', price: 299, duration: '1-2 hours' },
    { id: '2', name: 'Bathroom Installation', price: 2499, duration: '1 day' },
    { id: '3', name: 'Tap & Faucet Fix', price: 199, duration: '30 mins' },
    { id: '4', name: 'Drainage Cleaning', price: 499, duration: '1-2 hours' },
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleNext = () => {
    if (step === 'service') {
      if (!selectedService) {
        toast.error('Please select a service');
        return;
      }
      setStep('datetime');
    } else if (step === 'datetime') {
      if (bookingType === 'scheduled' && (!selectedDate || !selectedTime)) {
        toast.error('Please select date and time');
        return;
      }
      setStep('address');
    } else if (step === 'address') {
      if (!address) {
        toast.error('Please enter your address');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirm');
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    
    toast.success('Booking confirmed!', {
      description: 'बुकिंग की पुष्टि हो गई!',
    });
    
    navigate('/booking-status/1');
  };

  const handleBack = () => {
    if (step === 'service') {
      navigate(-1);
    } else if (step === 'datetime') {
      setStep('service');
    } else if (step === 'address') {
      setStep('datetime');
    } else if (step === 'payment') {
      setStep('address');
    } else if (step === 'confirm') {
      setStep('payment');
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'service': return 'Select Service';
      case 'datetime': return 'Choose Date & Time';
      case 'address': return 'Enter Address';
      case 'payment': return 'Payment Method';
      case 'confirm': return 'Confirm Booking';
      default: return 'Book Service';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h3>{getStepTitle()}</h3>
            <p className="text-[#9CA3AF]">Step {['service', 'datetime', 'address', 'payment', 'confirm'].indexOf(step!) + 1} of 5</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FF6B35] transition-all duration-300"
            style={{ 
              width: `${(['service', 'datetime', 'address', 'payment', 'confirm'].indexOf(step!) + 1) * 20}%` 
            }}
          />
        </div>
      </div>

      <div className="p-4">
        {/* Service Selection */}
        {step === 'service' && (
          <div className="space-y-3">
            <p className="text-[#6B7280] mb-4">What service do you need?</p>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedService === service.id
                    ? 'border-[#FF6B35] bg-[#FFE8E0]'
                    : 'border-[#E5E7EB] bg-white hover:border-[#FF6B35]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4>{service.name}</h4>
                  {selectedService === service.id && (
                    <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span>{service.duration}</span>
                  <span className="font-medium text-[#FF6B35]">₹{service.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Date & Time Selection */}
        {step === 'datetime' && (
          <div className="space-y-6">
            <div>
              <p className="text-[#6B7280] mb-4">When do you need the service?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setBookingType('asap')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    bookingType === 'asap'
                      ? 'border-[#FF6B35] bg-[#FFE8E0]'
                      : 'border-[#E5E7EB] bg-white'
                  }`}
                >
                  <Clock className={`w-6 h-6 mx-auto mb-2 ${
                    bookingType === 'asap' ? 'text-[#FF6B35]' : 'text-[#6B7280]'
                  }`} />
                  <p className="font-medium text-center">ASAP</p>
                  <p className="text-[#9CA3AF] text-center">Within 1 hour</p>
                </button>
                <button
                  onClick={() => setBookingType('scheduled')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    bookingType === 'scheduled'
                      ? 'border-[#FF6B35] bg-[#FFE8E0]'
                      : 'border-[#E5E7EB] bg-white'
                  }`}
                >
                  <Calendar className={`w-6 h-6 mx-auto mb-2 ${
                    bookingType === 'scheduled' ? 'text-[#FF6B35]' : 'text-[#6B7280]'
                  }`} />
                  <p className="font-medium text-center">Schedule</p>
                  <p className="text-[#9CA3AF] text-center">Pick date & time</p>
                </button>
              </div>
            </div>

            {bookingType === 'scheduled' && (
              <>
                <div>
                  <label className="block mb-3 font-medium">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-4 bg-white border-2 border-[#E5E7EB] rounded-xl outline-none focus:border-[#FF6B35] transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-3 font-medium">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-lg border-2 transition-all ${
                          selectedTime === time
                            ? 'border-[#FF6B35] bg-[#FFE8E0] text-[#FF6B35]'
                            : 'border-[#E5E7EB] bg-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Address Input */}
        {step === 'address' && (
          <div className="space-y-4">
            <p className="text-[#6B7280] mb-4">Where should the provider come?</p>
            
            <div className="aspect-video bg-[#E5E7EB] rounded-xl flex items-center justify-center relative overflow-hidden">
              <MapPin className="w-12 h-12 text-[#9CA3AF]" />
              <button className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                Use Current Location
              </button>
            </div>

            <div>
              <label className="block mb-2 font-medium">Full Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete address with landmark"
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-[#E5E7EB] rounded-xl outline-none focus:border-[#FF6B35] transition-all resize-none"
              />
            </div>

            <div className="p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#92400E]">Address Tip</p>
                <p className="text-[#92400E]">Include nearby landmarks for easier navigation</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method */}
        {step === 'payment' && (
          <div className="space-y-4">
            <p className="text-[#6B7280] mb-4">How would you like to pay?</p>
            
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                paymentMethod === 'cash'
                  ? 'border-[#FF6B35] bg-[#FFE8E0]'
                  : 'border-[#E5E7EB] bg-white'
              }`}
            >
              <Wallet className={`w-6 h-6 ${
                paymentMethod === 'cash' ? 'text-[#FF6B35]' : 'text-[#6B7280]'
              }`} />
              <div className="flex-1 text-left">
                <p className="font-medium">Cash on Service</p>
                <p className="text-[#9CA3AF]">Pay after service completion</p>
              </div>
              {paymentMethod === 'cash' && (
                <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('online')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                paymentMethod === 'online'
                  ? 'border-[#FF6B35] bg-[#FFE8E0]'
                  : 'border-[#E5E7EB] bg-white'
              }`}
            >
              <CreditCard className={`w-6 h-6 ${
                paymentMethod === 'online' ? 'text-[#FF6B35]' : 'text-[#6B7280]'
              }`} />
              <div className="flex-1 text-left">
                <p className="font-medium">Online Payment</p>
                <p className="text-[#9CA3AF]">UPI, Cards, Wallets</p>
              </div>
              {paymentMethod === 'online' && (
                <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <div className="p-4 bg-[#DCFCE7] border border-[#16A34A] rounded-xl flex gap-3">
              <Check className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#14532D]">Secure Payment</p>
                <p className="text-[#14532D]">Your payment information is protected</p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirm' && selectedServiceData && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Service</span>
                  <span className="font-medium">{selectedServiceData.name}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">When</span>
                  <span className="font-medium">
                    {bookingType === 'asap' ? 'ASAP' : `${selectedDate} at ${selectedTime}`}
                  </span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Address</span>
                  <span className="font-medium text-right max-w-[200px]">{address}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Payment</span>
                  <span className="font-medium">
                    {paymentMethod === 'cash' ? 'Cash on Service' : 'Online'}
                  </span>
                </div>
                
                <div className="flex justify-between pt-2">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-[#FF6B35]">₹{selectedServiceData.price}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#DBEAFE] border border-[#3B82F6] rounded-xl">
              <p className="text-[#1E40AF]">
                Your booking request will be sent to the provider. They will confirm within a few minutes.
              </p>
              <p className="text-[#1E40AF] mt-2">
                आपका बुकिंग अनुरोध प्रदाता को भेजा जाएगा। वे कुछ मिनटों में पुष्टि करेंगे।
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-[#E5E7EB]">
        {step === 'confirm' ? (
          <button
            onClick={handleConfirmBooking}
            disabled={loading}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirming...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Confirm Booking • बुकिंग की पुष्टि करें</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
