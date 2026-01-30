
import React, { useEffect, useRef } from "react";

const IsInViewPort = ({
  id,
  children,
  setIsInViewport ,
  // isInViewport,
}: {
  id: string;
  // children: React.ReactNode;
  children: React.ReactNode;
  setIsInViewport: React.Dispatch<React.SetStateAction<boolean>>;
  // isInViewport: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.4;

        setIsInViewport(prev => (prev === visible ? prev : visible));
      },
      {
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 1],
        rootMargin: "0px 0px 200px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} ref={cardRef}>

      {children}
    </div>
  );
};

export default IsInViewPort;
