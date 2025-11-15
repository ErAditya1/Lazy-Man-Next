'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDebounceCallback } from 'usehooks-ts';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { checkUsername, register as apiRegister } from '@/lib/api/auth';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/components/Toast';

interface RegisterProps {
  onOtpRequested?: (phone: string) => void;
}

/**
 * Form schema
 */
const signUpSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Username may contain letters, numbers, - _ .'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  teamCode: z.string().optional(),
  phone: z
    .string()
    .min(10, 'Phone must be 10 digits')
    .max(10, 'Phone must be 10 digits'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function Register({ onOtpRequested }: RegisterProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [usernameState, setUsernameState] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [suggestUsername, setSuggestUsername] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceCallback((val: string) => {
    setUsernameState(val);
  }, 700);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      teamCode: '',
      phone: '',
    },
  });

  // watch username field changes via form
  const usernameWatch = form.watch('username');

  useEffect(() => {
    // debounce the username input to reduce API calls
    debouncedUsername(usernameWatch || '');
  }, [usernameWatch, debouncedUsername]);

  // Check username uniqueness when debounced username changes
  useEffect(() => {
    let mounted = true;
    async function check() {
      if (!usernameState || usernameState.trim().length < 3) {
        setUsernameMessage('');
        setSuggestUsername('');
        return;
      }
      setIsCheckingUsername(true);
      setUsernameMessage('');
      try {
        const res = await checkUsername(usernameState);
        if (!mounted) return;
        setUsernameMessage(res.data.message || '');
        setSuggestUsername(res.data.data?.username || '');
      } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        setUsernameMessage(axiosErr.response?.data.message ?? 'Error checking username');
        setSuggestUsername('');
      } finally {
        if (mounted) setIsCheckingUsername(false);
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [usernameState]);

  const onSubmit = async (payload: SignUpFormValues) => {
    setIsSubmitting(true);
    try {
      // call your register API (adjust payload shape if needed)
      const response = await apiRegister({
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
      });

      showToast(response.data.message ?? 'Registered successfully', 'success');

      // optionally call OTP flow handler passed from parent
      onOtpRequested?.(payload.phone);

      // navigate to verification page
      router.replace(`/verify/${response.data.data?.username ?? payload.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      showToast(axiosError.response?.data.message ?? 'Register failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // helper to quickly use suggested username
  const applySuggestedUsername = () => {
    if (suggestUsername) {
      form.setValue('username', suggestUsername);
      setUsernameState(suggestUsername);
      setSuggestUsername('');
      setUsernameMessage('Username prefilled from suggestion');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FBFBFD] to-white flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Mobile compact header (shown only on small screens) */}
        <div className="md:hidden flex items-center gap-4 p-4 border-b">
          <div className="w-12 h-12 relative shrink-0">
            <Image src="/image/logo.png" alt="Lazy Man" fill className="rounded-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Lazy Man</h3>
            <p className="text-xs text-slate-500">Instant mini services</p>
          </div>
        </div>

        {/* Left Marketing / Logo panel (visible on md+) */}
        <aside className="hidden md:flex flex-col items-center justify-center gap-6 p-10 bg-linear-to-br from-[#FFFAF7] to-white">
          <div className="w-28 h-28 relative shrink-0">
            <Image src="/image/logo.png" alt="Lazy Man" width={112} height={112} className="rounded-full object-cover" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 text-center">Welcome to Lazy Man</h2>
          <p className="text-slate-600 text-center max-w-xs">
            Find local helpers quickly — plumbers, electricians, maids and more. Sign up to get started.
          </p>

          <div className="mt-4 w-full max-w-xs">
            <dl className="grid gap-3">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-[#FF6B35]/10 p-2 text-[#FF6B35]">🔧</div>
                <div>
                  <dt className="font-semibold text-slate-800">Verified Pros</dt>
                  <dd className="text-sm text-slate-500">Background checked & rated</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-[#10B981]/10 p-2 text-[#10B981]">🛡</div>
                <div>
                  <dt className="font-semibold text-slate-800">Secure Payments</dt>
                  <dd className="text-sm text-slate-500">Pay after service</dd>
                </div>
              </div>
            </dl>
          </div>
        </aside>

        {/* Right: Form */}
        <main className="p-6 md:p-10">
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Create account</h1>
              <p className="text-sm text-slate-600 mt-2">Sign up with your details and verify your phone.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off" noValidate>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Your full name"
                        autoComplete="name"
                        className="text-sm md:text-base py-3 md:py-4"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input
                        {...field}
                        placeholder="username (letters, numbers, - _ .)"
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedUsername(e.target.value);
                        }}
                        aria-describedby="username-help"
                        aria-invalid={!!form.formState.errors.username}
                        className="text-sm md:text-base py-3 md:py-4"
                      />
                      <div id="username-help" className="mt-2 flex items-center gap-2">
                        {isCheckingUsername && <Loader2 className="animate-spin w-4 h-4 text-slate-400" />}
                        {!!usernameMessage && (
                          <p className={`text-sm ${usernameMessage === 'Username is available' ? 'text-green-600' : 'text-red-600'}`}>
                            {usernameMessage}
                          </p>
                        )}
                        {!!suggestUsername && (
                          <button
                            type="button"
                            onClick={applySuggestedUsername}
                            className="ml-auto text-sm text-[#FF6B35] hover:underline"
                          >
                            Use: {suggestUsername}
                          </button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="text-sm md:text-base py-3 md:py-4"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="text-sm md:text-base py-3 md:py-4"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center px-4 py-3 bg-[#F7F8FA] rounded-xl border border-[#E5E7EB] text-sm">+91</div>
                        <Input
                          {...field}
                          placeholder="9876543210"
                          onChange={(e: any) => {
                            const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                            field.onChange(cleaned);
                          }}
                          inputMode="numeric"
                          aria-label="Phone number"
                          className="text-sm md:text-base py-3 md:py-4"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              

                <Button
                  type="submit"
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A2A] text-white py-3 md:py-4 rounded-xl text-sm md:text-base"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating account...' : 'Sign up'}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-slate-600 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-[#FF6B35] font-medium hover:underline">
                Login
              </Link>
            </p>

            <div className="mt-6 text-center text-xs text-slate-400">
              By signing up you agree to our{' '}
              <Link href="/terms" className="underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
