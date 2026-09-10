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
      <div className="group relative">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-brand-200 bg-white transition-colors group-hover:border-primary sm:h-20 sm:w-20">
          <span className="text-3xl font-bold tabular-nums tracking-[-0.03em] text-primary sm:text-4xl">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/70">
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
