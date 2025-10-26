"use client"
import { useEffect, useState } from 'react';

export default function LogoCloud() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const logos = [
    { name: 'TechCorp', icon: 'T' },
    { name: 'DataFlow', icon: 'D' },
    { name: 'CloudSys', icon: 'C' },
    { name: 'InnovateLab', icon: 'I' },
    { name: 'NextGen', icon: 'N' },
    { name: 'QuantumAI', icon: 'Q' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 0.5) % 300);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="overflow-hidden relative">
        <div
          className="flex gap-16"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center w-32 h-16"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{logo.icon}</span>
                </div>
                <span className="text-lg font-medium text-gray-700">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
