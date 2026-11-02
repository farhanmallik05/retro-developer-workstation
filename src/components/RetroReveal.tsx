import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type RetroAnimationType = 'fade-up' | 'slide-left' | 'slide-right' | 'scale';

interface RetroRevealProps {
  children: React.ReactNode;
  animation?: RetroAnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
  as?: React.ElementType;
}

export const RetroReveal: React.FC<RetroRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.12,
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  const animClassMap: Record<RetroAnimationType, string> = {
    'fade-up': 'retro-reveal-fade-up',
    'slide-left': 'retro-reveal-slide-left',
    'slide-right': 'retro-reveal-slide-right',
    'scale': 'retro-reveal-scale',
  };

  const delayStyle: React.CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Component
      ref={ref}
      style={delayStyle}
      className={`retro-reveal ${animClassMap[animation]} ${isVisible ? 'revealed' : ''} ${className}`}
    >
      {children}
    </Component>
  );
};
