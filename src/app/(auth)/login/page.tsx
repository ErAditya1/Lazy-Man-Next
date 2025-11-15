'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginProps {
  onSuccess?: () => void; // Called when login succeeds
}

export default function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.includes('@') || email.length < 5) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      // simulate login request
      await new Promise((r) => setTimeout(r, 900));

      // demo: fake failure if email contains "fail"
      if (email.includes('fail')) {
        throw new Error('Invalid credentials');
      }

      // success
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBFBFD] to-white p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left - marketing / logo (hidden on small screens) */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 p-10 bg-gradient-to-br from-[#FFFAF7] to-white">
          <div className="w-28 h-28 relative">
            <Image src="/image/logo.png" alt="Lazy Man" width={112} height={112} className="rounded-full object-cover" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">Welcome back</h3>
          <p className="text-sm text-slate-600 text-center max-w-xs">
            Sign in to book local helpers — plumbers, electricians, cleaners and more. Fast bookings, verified pros.
          </p>

          <div className="mt-4 w-full max-w-xs">
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="rounded-md bg-[#FF6B35]/10 p-2 text-[#FF6B35]">🔧</span>
                <div>
                  <div className="font-semibold text-slate-800">Verified Pros</div>
                  <div className="text-xs">Background checked & rated</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="rounded-md bg-[#10B981]/10 p-2 text-[#10B981]">💳</span>
                <div>
                  <div className="font-semibold text-slate-800">Secure payments</div>
                  <div className="text-xs">Pay after service</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - form */}
        <main className="p-6 sm:p-8 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Small logo for mobile */}
            <div className="md:hidden flex items-center gap-3 mb-6">
              <div className="w-12 h-12 relative">
                <Image src="/image/logo.png" alt="Lazy Man" width={48} height={48} className="rounded-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Lazy Man</h2>
                <p className="text-xs text-slate-500">Instant mini services</p>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Sign in</h1>
            <p className="text-sm text-slate-600 mb-6">Welcome back — please enter your details to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-[#FF6B35]/30 transition"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'form-error' : undefined}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-[#FF6B35]/30 transition pr-12"
                    aria-invalid={!!error}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E5E7EB] focus:ring-[#FF6B35]"
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>

                <Link href="/forgot" className="text-[#FF6B35] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div id="form-error" role="status" className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-[#FF6B35] hover:bg-[#E55A2A] text-white py-3 rounded-xl font-medium disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200"></div>
              <div className="text-xs text-slate-400">or</div>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <button
              onClick={() => alert('Google sign-in placeholder')}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2 rounded-xl hover:bg-slate-50"
            >
              <img src="/image/google-icon.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm text-slate-700">Continue with Google</span>
            </button>

            <p className="text-center text-sm text-slate-600 mt-4">
              Don’t have an account?{' '}
              <Link href="/register" className="text-[#FF6B35] font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
