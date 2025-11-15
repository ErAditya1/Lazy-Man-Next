// src/screens/VerifyOTP.tsx
'use client';

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { InputOTP } from "@/components/ui/InputOTP";

interface VerifyOTPProps {
  phone?: string;
  onVerified?: (payload?: { phone?: string }) => void;
  onBack?: () => void;
}

export default function VerifyOTP({ phone = "", onVerified, onBack }: VerifyOTPProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // start countdown when resendTimer set
  useEffect(() => {
    if (resendTimer <= 0) return;

    intervalRef.current = window.setInterval(() => {
      setResendTimer((s) => {
        if (s <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [resendTimer]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handleVerify = async () => {
    if (otp.trim().length !== 6) {
      alert("Enter full 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      // TODO: call API to verify OTP
      // example: await api.verifyOtp({ phone, otp });
      await new Promise((r) => setTimeout(r, 900));

      // success callback
      onVerified?.({ phone });
    } catch (err) {
      // handle error (toast/snack)
      alert("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;

    // TODO: call API to resend OTP (phone)
    // example: await api.resendOtp({ phone });

    setResendTimer(30); // 30s cooldown
    // The countdown effect handles the interval
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBFBFD] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left marketing / image on md+ */}
          <aside className="hidden md:flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-[#FFFAF7] to-white">
            <div className="w-24 h-24 relative">
              <Image src="/image/logo.png" alt="Lazy Man" width={96} height={96} className="rounded-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Verify your number</h3>
            <p className="text-sm text-slate-600 text-center max-w-xs">
              Enter the 6-digit code we sent to your phone to continue.
            </p>
          </aside>

          {/* Main content */}
          <main className="p-6 md:p-8 flex items-center">
            <div className="w-full">
              <button
                onClick={onBack}
                aria-label="Back"
                className="text-sm text-slate-600 hover:text-slate-800 mb-4 inline-flex items-center gap-2"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Verify OTP</h2>
              <p className="text-sm text-slate-600 mb-6">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-slate-800">+91 {phone || "your number"}</span>
              </p>

              <div className="flex justify-center mb-6">
                {/* InputOTP is expected to be accessible; center it and make responsive */}
                <div className="w-full max-w-sm">
                  <InputOTP value={otp} onChange={setOtp}  />
                </div>
              </div>

              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2A] text-white py-3 rounded-xl mb-3 disabled:opacity-60"
                aria-disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <span className="text-sm text-slate-600">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-[#FF6B35] hover:underline"
                    aria-disabled={resendTimer > 0}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="mt-6 text-center text-xs text-slate-400">
                If you didn't receive the code, check your SMS inbox or try again.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
