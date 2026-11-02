import React, { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CYBER_GLYPHS = '01#@$%&*<>[]{}_/\\-=+~!?▲▼';

interface RetroDecoderTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  delay?: number;
}

export const RetroDecoderText: React.FC<RetroDecoderTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  duration = 600,
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [displayText, setDisplayText] = useState(text);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      hasAnimatedRef.current = true;
      return;
    }

    hasAnimatedRef.current = true;

    const timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const length = text.length;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // How many characters have settled to their final letter
        const settledCount = Math.floor(progress * length);

        let scrambled = '';
        for (let i = 0; i < length; i++) {
          if (text[i] === ' ') {
            scrambled += ' ';
          } else if (i < settledCount) {
            scrambled += text[i];
          } else {
            scrambled += CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          }
        }

        setDisplayText(scrambled);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isVisible, text, duration, delay]);

  return (
    <Component ref={ref} className={className}>
      {displayText}
    </Component>
  );
};
