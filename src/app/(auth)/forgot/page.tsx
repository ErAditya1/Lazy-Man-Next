'use client'
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  onOtpRequested?: (emailOrPhone: string) => void;
}

export default function ForgotPassword({ onOtpRequested }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  const handleRequest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus(null);

    if (!value.trim()) {
      setStatus({ type: "error", message: "Please enter your email or phone" });
      return;
    }

    setLoading(true);
    try {
      // TODO: call API to request password reset (send OTP or reset link)
      await new Promise((r) => setTimeout(r, 900));

      // call parent callback (e.g., navigate to verify)
      onOtpRequested?.(value.trim());

      setStatus({
        type: "success",
        message: "If this account exists, a reset code/link was sent.",
      });
    } catch (err) {
      setStatus({ type: "error", message: "Failed to send reset code. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBFBFD] to-white flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Marketing / Logo (desktop) */}
        <aside className="hidden md:flex flex-col items-center justify-center gap-6 p-8 md:p-10 bg-gradient-to-br from-[#FFFAF7] to-white">
          <div className="w-24 h-24 relative">
            <Image src="/image/logo.png" alt="Lazy Man" width={96} height={96} className="rounded-full object-cover" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 text-center">Forgot password</h3>
          <p className="text-slate-600 text-center max-w-xs">
            Enter your registered email or phone. We'll send a code or link so you can reset your password quickly.
          </p>
          <div className="mt-4 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-[#FF6B35]/10 p-2">🔒</div>
              <div>Secure reset link</div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <main className="p-6 sm:p-8 md:p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile header */}
            <div className="md:hidden flex items-center gap-3 mb-6">
              <div className="w-12 h-12 relative">
                <Image src="/image/logo.png" alt="Lazy Man" width={48} height={48} className="rounded-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Lazy Man</h2>
                <p className="text-xs text-slate-500">Reset your password</p>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Forgot password</h1>
            <p className="text-sm text-slate-600 mb-6">Enter your registered email address or phone number and we’ll send a reset code or link.</p>

            <form onSubmit={handleRequest} className="space-y-4" autoComplete="off" noValidate>
              <label htmlFor="emailOrPhone" className="block text-sm font-medium text-slate-700">
                Email or phone
              </label>
              <input
                id="emailOrPhone"
                name="emailOrPhone"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="you@example.com or 9876543210"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-[#FF6B35]/30 transition"
                inputMode="email"
              />

              {status && (
                <div
                  role="status"
                  className={`rounded-md px-3 py-2 text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-[#FF6B35] hover:bg-[#E55A2A] text-white py-3 rounded-xl font-medium disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset code"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-sm">
              <Link href="/login" className="text-[#FF6B35] hover:underline">
                Back to login
              </Link>
              <Link href="/register" className="text-slate-600 hover:underline">
                Create an account
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-400 text-center">
              If you don't receive an email, check your spam folder or try again later.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
