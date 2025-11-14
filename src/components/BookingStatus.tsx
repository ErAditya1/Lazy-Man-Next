import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MessageCircle, MapPin, Clock,
  CheckCircle, Loader2, Star, Navigation
} from 'lucide-react';

const statusSteps = [
  { id: 'requested', label: 'Requested', labelHindi: 'अनुरोध किया गया', icon: Clock },
  { id: 'accepted', label: 'Accepted', labelHindi: 'स्वीकृत', icon: CheckCircle },
  { id: 'in_progress', label: 'In Progress', labelHindi: 'प्रगति में', icon: Loader2 },
  { id: 'completed', label: 'Completed', labelHindi: 'पूर्ण', icon: CheckCircle },
];

export default function BookingStatus() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [currentStatus, setCurrentStatus] = useState<'requested' | 'accepted' | 'in_progress' | 'completed'>('requested');

  // Simulate status progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setCurrentStatus('accepted'), 3000));
    timers.push(setTimeout(() => setCurrentStatus('in_progress'), 6000));
    timers.push(setTimeout(() => setCurrentStatus('completed'), 9000));

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const currentStepIndex = statusSteps.findIndex(s => s.id === currentStatus);
  const isCompleted = currentStatus === 'completed';

  const handleComplete = () => {
    navigate(`/review/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h3>Booking Status</h3>
            <p className="text-[#9CA3AF]">Booking #{bookingId}</p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white mt-2 p-6">
        <h3 className="mb-6">Service Status</h3>
        
        <div className="space-y-6">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-[#FF6B35] text-white' 
                      : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  }`}>
                    <Icon className={`w-6 h-6 ${isCurrent && step.id === 'in_progress' ? 'animate-spin' : ''}`} />
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`w-0.5 h-12 transition-all ${
                      index < currentStepIndex ? 'bg-[#FF6B35]' : 'bg-[#E5E7EB]'
                    }`} />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h4 className={isCurrent ? 'text-[#FF6B35]' : ''}>{step.label}</h4>
                  <p className={`${isCurrent ? 'text-[#FF6B35]' : 'text-[#9CA3AF]'}`}>
                    {step.labelHindi}
                  </p>
                  {isCurrent && (
                    <div className="mt-2 p-3 bg-[#FFE8E0] rounded-lg animate-fade-in">
                      <p className="text-[#FF6B35]">
                        {step.id === 'requested' && 'Waiting for provider confirmation...'}
                        {step.id === 'accepted' && 'Provider is on the way!'}
                        {step.id === 'in_progress' && 'Service in progress...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Info */}
      <div className="bg-white mt-2 p-6">
        <h3 className="mb-4">Provider Details</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-xl flex items-center justify-center text-white relative">
            RK
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#16A34A] border-2 border-white rounded-full" />
          </div>
          <div className="flex-1">
            <h4>Rajesh Kumar</h4>
            <p className="text-[#6B7280]">Professional Plumber</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
              <span className="font-medium">4.8</span>
              <span className="text-[#9CA3AF]">(234 reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open('tel:+919876543210', '_self')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#16A34A] text-white rounded-xl hover:bg-[#15803D] active:scale-[0.98] transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>Call • कॉल करें</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F7F8FA] rounded-xl hover:bg-[#E5E7EB] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Message</span>
          </button>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white mt-2 p-6">
        <h3 className="mb-4">Service Details</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Service</span>
            <span className="font-medium">Pipe Leak Repair</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Scheduled Time</span>
            <span className="font-medium">ASAP</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Amount</span>
            <span className="font-medium text-[#FF6B35]">₹299</span>
          </div>
          
          <div className="pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-start gap-2 text-[#6B7280]">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#111827] mb-1">Service Address</p>
                <p>Plot 123, Koramangala 4th Block, Near Forum Mall, Bangalore - 560034</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Tracking (when accepted) */}
      {currentStatus === 'accepted' && (
        <div className="bg-white mt-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Provider Location</h3>
            <div className="flex items-center gap-1 text-[#FF6B35]">
              <Navigation className="w-4 h-4" />
              <span className="font-medium">2.5 km away</span>
            </div>
          </div>
          
          <div className="aspect-video bg-[#E5E7EB] rounded-xl flex items-center justify-center">
            <div className="text-center text-[#6B7280]">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-[#9CA3AF]" />
              <p>Live tracking map</p>
              <p className="text-[#9CA3AF]">ETA: 15 minutes</p>
            </div>
          </div>
        </div>
      )}

      {/* Completion CTA */}
      {isCompleted && (
        <div className="fixed bottom-6 left-4 right-4 animate-slide-up">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-[#16A34A]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="text-[#16A34A]">Service Completed!</h3>
                <p className="text-[#6B7280]">सेवा पूर्ण हो गई!</p>
              </div>
            </div>
            
            <button
              onClick={handleComplete}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" />
              <span>Rate & Review • समीक्षा दें</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
