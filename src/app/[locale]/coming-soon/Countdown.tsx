"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        {/* Glow behind the number */}
        <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-primary/5 border border-primary/20 rounded-2xl backdrop-blur-md overflow-hidden shadow-sm transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
          <span className="text-3xl sm:text-4xl font-black text-primary tabular-nums tracking-tighter">
            {value.toString().padStart(2, "0")}
          </span>
          {/* Animated glass line */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        </div>
      </div>
      <span className="mt-2 text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-4 sm:gap-6">
      <TimeUnit value={timeLeft.days} label="Ngày" />
      <TimeUnit value={timeLeft.hours} label="Giờ" />
      <TimeUnit value={timeLeft.minutes} label="Phút" />
      <TimeUnit value={timeLeft.seconds} label="Giây" />
    </div>
  );
}
