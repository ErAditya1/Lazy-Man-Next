// src/layouts/AuthLayout.tsx
import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full ">{children}</div>
      </div>
      <footer className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Lazy Man — Built by Aditya Kumar
      </footer>
    </div>
  );
}
