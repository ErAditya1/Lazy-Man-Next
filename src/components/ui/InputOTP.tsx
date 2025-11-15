// src/ui/InputOTP.tsx
import React, { useRef, useState, useEffect } from "react";

interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function InputOTP({ length = 6, value = "", onChange, className = "", autoFocus = false }: InputOTPProps) {
  const [digits, setDigits] = useState<string[]>(() => value.split("").slice(0, length));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // keep internal state in sync if parent controls value
    const arr = value.split("").slice(0, length);
    setDigits((d) => {
      const newArr = Array.from({ length }, (_, i) => arr[i] ?? d[i] ?? "");
      return newArr;
    });
  }, [value, length]);

  const focusTo = (i: number) => {
    const el = inputsRef.current[i];
    if (el) el.focus();
  };

  const handleChange = (index: number, v: string) => {
    v = v.replace(/\D/g, "").slice(0, 1);
    setDigits((prev) => {
      const next = prev.slice();
      next[index] = v;
      const final = next.join("");
      onChange?.(final);
      return next;
    });
    if (v !== "" && index < length - 1) focusTo(index + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // clear current
        setDigits((prev) => {
          const next = prev.slice();
          next[index] = "";
          onChange?.(next.join(""));
          return next;
        });
      } else if (index > 0) {
        focusTo(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusTo(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusTo(index + 1);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) inputsRef.current[i] = el;
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-12 h-12 md:w-14 md:h-14 text-center rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] focus:border-[#FF6B35] focus:outline-none text-xl"
          value={digits[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          maxLength={1}
          autoFocus={autoFocus && i === 0}
        />
      ))}
    </div>
  );
}
