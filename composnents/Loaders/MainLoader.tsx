"use client";

import { useEffect, useRef, useState } from "react";

const MainLoader = ({ duration = 6000 }: { duration?: number }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stepTime = duration / 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration]);

  // auto close when progress finishes
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 1000); 

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  // lock scroll
  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      <div className="mb-8 animate-pulse">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-2xl">
          <span className="text-primary-foreground font-bold text-4xl">E</span>
        </div>
      </div>

      <p className="text-muted-foreground mb-8">
        Please wait while we prepare your experience
      </p>

      <div className="w-52 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default MainLoader;
