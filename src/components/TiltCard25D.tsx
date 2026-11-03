import React, { useRef, useState } from 'react';

interface TiltCard25DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard25D: React.FC<TiltCard25DProps> = ({
  children,
  className = '',
  maxTilt = 8,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number; glareX: number; glareY: number; active: boolean }>({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = (mouseX / width - 0.5) * 2; // -1 to 1
    const yPercent = (mouseY / height - 0.5) * 2; // -1 to 1

    const rotX = -yPercent * maxTilt;
    const rotY = xPercent * maxTilt;

    setTilt({
      x: rotX,
      y: rotY,
      glareX: (mouseX / width) * 100,
      glareY: (mouseY / height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: tilt.active
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      }}
    >
      {/* Specular Radial Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg z-20 transition-opacity duration-300"
        style={{
          opacity: tilt.active ? 1 : 0,
          background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.04) 40%, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

