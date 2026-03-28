"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  value: string;
  duration?: number;
}

export default function Counter({ value, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const numericValueStr = value.replace(/[^0-9]/g, '');
  const numericValue = parseInt(numericValueStr) || 0;
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4);
      };

      const currentCount = Math.floor(numericValue * easeOutQuart(percentage));
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, numericValue, duration]);

  const displayValue = new Intl.NumberFormat('vi-VN').format(count);

  return (
    <div ref={elementRef} className="tabular-nums">
      {displayValue}{suffix}
    </div>
  );
}
