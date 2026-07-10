"use client";

import { useEffect } from "react";

const revealSelector = ".home-reveal, .home-reveal-left, .home-reveal-right, .home-stagger";

export default function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    document.querySelectorAll(revealSelector).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
