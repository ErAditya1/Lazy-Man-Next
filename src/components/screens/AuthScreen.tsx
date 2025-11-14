import { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { ArrowLeft, Phone, Mail, Lock, Smartphone } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface AuthScreenProps {
  lang: Language;
  onAuthComplete: (userData: { phone?: string; email?: string; name?: string }) => void;
  onBack?: () => void;
}

type AuthMode = 'phone' | 'otp' | 'email';
type AuthType = 'signin' | 'signup';

export function AuthScreen({ lang, onAuthComplete, onBack }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('phone');
  const [authType, setAuthType] = useState<AuthType>('signin');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Simulate OTP send
  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setMode('otp');
        setResendTimer(30);
        // Start countdown
        const interval = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1000);
    }
  };

  // Simulate OTP verification
  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onAuthComplete({ phone: phoneNumber });
      }, 1000);
    }
  };

  // Simulate email auth
  const handleEmailAuth = () => {
    if (email && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onAuthComplete({ email });
      }, 1000);
    }
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      // Simulate API call
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F7F8FA] to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-[#6B7280]/10 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          {(onBack || mode !== 'phone') && (
            <button
              onClick={() => {
                if (mode === 'otp') setMode('phone');
                else if (mode === 'email') setMode('phone');
                else if (onBack) onBack();
              }}
              className="p-2 -ml-2 hover:bg-[#6B7280]/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#111827]" />
            </button>
          )}
          <h1 className="text-[#111827]">
            {authType === 'signin' ? t('sign_in', lang) : t('sign_up', lang)}
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Phone Number Entry */}
        {mode === 'phone' && (
          <div className="space-y-6 animate-fade-in">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 flex items-center justify-center mb-8">
              <Smartphone className="w-10 h-10 text-[#FF6B35]" />
            </div>

            <div className="text-center mb-8">
              <h2 className="mb-2">{t('enter_phone', lang)}</h2>
              <p className="text-[#6B7280]">
                {authType === 'signin' 
                  ? t('welcome_back', lang)
                  : 'We\'ll send you a verification code'}
              </p>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-[#6B7280]">{t('phone_number', lang)}</label>
              <div className="flex gap-2">
                <div className="flex items-center px-4 py-3 bg-[#F7F8FA] rounded-xl border border-[#6B7280]/20">
                  <span className="text-[#111827]">+91</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 bg-[#F7F8FA] rounded-xl border border-[#6B7280]/20 focus:border-[#FF6B35] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              disabled={phoneNumber.length < 10 || isLoading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Sending...' : t('send_otp', lang)}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-[#6B7280]/20"></div>
              <span className="text-[#6B7280]">{t('or_continue_with', lang)}</span>
              <div className="flex-1 h-px bg-[#6B7280]/20"></div>
            </div>

            {/* Email Option */}
            <button
              onClick={() => setMode('email')}
              className="w-full flex items-center justify-center gap-2 py-4 border border-[#6B7280]/20 rounded-xl hover:bg-[#F7F8FA] transition-colors"
            >
              <Mail className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#111827]">{t('email_address', lang)}</span>
            </button>

            {/* Switch Auth Type */}
            <div className="text-center mt-6">
              <button
                onClick={() => setAuthType(authType === 'signin' ? 'signup' : 'signin')}
                className="text-[#6B7280] hover:text-[#FF6B35] transition-colors"
              >
                {authType === 'signin' ? t('dont_have_account', lang) : t('already_have_account', lang)}
                {' '}
                <span className="text-[#FF6B35]">
                  {authType === 'signin' ? t('sign_up', lang) : t('sign_in', lang)}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* OTP Verification */}
        {mode === 'otp' && (
          <div className="space-y-6 animate-fade-in">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 flex items-center justify-center mb-8">
              <Phone className="w-10 h-10 text-[#FF6B35]" />
            </div>

            <div className="text-center mb-8">
              <h2 className="mb-2">{t('enter_otp', lang)}</h2>
              <p className="text-[#6B7280]">
                {t('otp_sent', lang)} <span className="text-[#111827]">+91 {phoneNumber}</span>
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center mb-8">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 md:w-14 md:h-14" />
                  <InputOTPSlot index={1} className="w-12 h-12 md:w-14 md:h-14" />
                  <InputOTPSlot index={2} className="w-12 h-12 md:w-14 md:h-14" />
                  <InputOTPSlot index={3} className="w-12 h-12 md:w-14 md:h-14" />
                  <InputOTPSlot index={4} className="w-12 h-12 md:w-14 md:h-14" />
                  <InputOTPSlot index={5} className="w-12 h-12 md:w-14 md:h-14" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-[#6B7280]">
                  Resend code in <span className="text-[#FF6B35]">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-[#FF6B35] hover:text-[#E55A2A] transition-colors"
                >
                  {t('resend_otp', lang)}
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length < 6 || isLoading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Verifying...' : t('verify_otp', lang)}
            </button>
          </div>
        )}

        {/* Email/Password Auth */}
        {mode === 'email' && (
          <div className="space-y-6 animate-fade-in">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 flex items-center justify-center mb-8">
              <Mail className="w-10 h-10 text-[#FF6B35]" />
            </div>

            <div className="text-center mb-8">
              <h2 className="mb-2">
                {authType === 'signin' ? t('welcome_back', lang) : t('sign_up', lang)}
              </h2>
              <p className="text-[#6B7280]">
                {authType === 'signin' 
                  ? 'Sign in with your email and password'
                  : 'Create an account with your email'}
              </p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[#6B7280]">{t('email_address', lang)}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#F7F8FA] rounded-xl border border-[#6B7280]/20 focus:border-[#FF6B35] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[#6B7280]">{t('password', lang)}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[#F7F8FA] rounded-xl border border-[#6B7280]/20 focus:border-[#FF6B35] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Forgot Password */}
            {authType === 'signin' && (
              <div className="text-right">
                <button className="text-[#FF6B35] hover:text-[#E55A2A] transition-colors">
                  {t('forgot_password', lang)}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleEmailAuth}
              disabled={!email || !password || isLoading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Please wait...' : authType === 'signin' ? t('sign_in', lang) : t('sign_up', lang)}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-[#6B7280]/20"></div>
              <span className="text-[#6B7280]">{t('or_continue_with', lang)}</span>
              <div className="flex-1 h-px bg-[#6B7280]/20"></div>
            </div>

            {/* Phone Option */}
            <button
              onClick={() => setMode('phone')}
              className="w-full flex items-center justify-center gap-2 py-4 border border-[#6B7280]/20 rounded-xl hover:bg-[#F7F8FA] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#111827]">{t('phone_number', lang)}</span>
            </button>

            {/* Switch Auth Type */}
            <div className="text-center mt-6">
              <button
                onClick={() => setAuthType(authType === 'signin' ? 'signup' : 'signin')}
                className="text-[#6B7280] hover:text-[#FF6B35] transition-colors"
              >
                {authType === 'signin' ? t('dont_have_account', lang) : t('already_have_account', lang)}
                {' '}
                <span className="text-[#FF6B35]">
                  {authType === 'signin' ? t('sign_up', lang) : t('sign_in', lang)}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
