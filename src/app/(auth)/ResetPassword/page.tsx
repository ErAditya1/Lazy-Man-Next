// src/screens/ResetPassword.tsx
'use client';

import Link from "next/link";
import React, { useState } from "react";

interface Props {
  token?: string; // if using token-based flow
  onReset?: () => void;
}

export default function ResetPassword({ token, onReset }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    // TODO: API call to reset password
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    alert("Password updated successfully!");
    onReset?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F8FA] to-white p-6">
      <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-900">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your new password below.
        </p>

        {/* New Password */}
        <label className="text-sm text-gray-600">New password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full p-3 rounded-xl bg-[#F7F8FA] border border-gray-300 mb-4 focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />

        {/* Confirm Password */}
        <label className="text-sm text-gray-600">Confirm password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
          className="w-full p-3 rounded-xl bg-[#F7F8FA] border border-gray-300 mb-6 focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          onClick={handleReset}
          className="w-full bg-[#FF6B35] text-white py-3 rounded-xl text-lg font-medium hover:bg-[#E55A2A] transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save new password"}
        </button>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Back to{" "}
          <Link href="/login" className="text-[#FF6B35] font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
