import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthProps {
  onAuthComplete: (userType: 'customer' | 'provider' | 'admin') => void;
}

export default function Auth({ onAuthComplete }: AuthProps) {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (method === 'phone' && phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number', {
        description: 'कृपया एक मान्य फ़ोन नंबर दर्ज करें',
      });
      return;
    }
    if (method === 'email' && !email.includes('@')) {
      toast.error('Please enter a valid email', {
        description: 'कृपया एक मान्य ईमेल दर्ज करें',
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setStep('otp');
    toast.success('OTP sent successfully', {
      description: 'OTP सफलतापूर्वक भेजा गया',
    });
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter valid OTP', {
        description: 'कृपया मान्य OTP दर्ज करें',
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    // Demo: if phone ends with 999, login as provider; 888 as admin
    let finalUserType: 'customer' | 'provider' | 'admin' = userType;
    if (phoneNumber.endsWith('999')) {
      finalUserType = 'provider';
    } else if (phoneNumber.endsWith('888')) {
      finalUserType = 'admin';
    }

    toast.success('Login successful!', {
      description: 'लॉगिन सफल!',
    });
    
    onAuthComplete(finalUserType);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('input');
      setOtp('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        {step === 'otp' && (
          <button
            onClick={handleBack}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg transition-colors -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="mb-2">
            {step === 'input' ? 'Welcome Back' : 'Verify OTP'}
          </h1>
          <p className="text-[#FF6B35] mb-2">
            {step === 'input' ? 'वापसी पर स्वागत है' : 'OTP सत्यापित करें'}
          </p>
          <p className="text-[#6B7280] mb-8">
            {step === 'input' 
              ? 'Enter your phone number or email to continue'
              : `Enter the 6-digit code sent to ${method === 'phone' ? phoneNumber : email}`
            }
          </p>

          {step === 'input' ? (
            <>
              {/* User type toggle */}
              <div className="flex gap-2 p-1 bg-[#F7F8FA] rounded-xl mb-6">
                <button
                  onClick={() => setUserType('customer')}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    userType === 'customer'
                      ? 'bg-white shadow-sm'
                      : 'text-[#6B7280]'
                  }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setUserType('provider')}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    userType === 'provider'
                      ? 'bg-white shadow-sm'
                      : 'text-[#6B7280]'
                  }`}
                >
                  Provider
                </button>
              </div>

              {/* Method toggle */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setMethod('phone')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    method === 'phone'
                      ? 'border-[#FF6B35] bg-[#FFE8E0] text-[#FF6B35]'
                      : 'border-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </button>
                <button
                  onClick={() => setMethod('email')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    method === 'email'
                      ? 'border-[#FF6B35] bg-[#FFE8E0] text-[#FF6B35]'
                      : 'border-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>

              {/* Input */}
              {method === 'phone' ? (
                <div className="mb-6">
                  <label className="block mb-2 text-[#6B7280]">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="w-16 px-3 py-4 bg-[#F7F8FA] rounded-xl text-center">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="flex-1 px-4 py-4 bg-[#F7F8FA] rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
                      maxLength={10}
                    />
                  </div>
                  <p className="text-[#9CA3AF] mt-2">
                    Demo: Use ...999 for provider, ...888 for admin
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block mb-2 text-[#6B7280]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-4 bg-[#F7F8FA] rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
                  />
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="mb-6">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-4 bg-[#F7F8FA] rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all text-center tracking-[0.5em] text-2xl"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              <button
                onClick={handleSendOTP}
                className="w-full text-[#FF6B35] py-3 hover:bg-[#FFE8E0] rounded-xl transition-all"
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
