
import { useEffect, useState } from "react";

/**
 * Hook for staggered animations of multiple elements
 */
export const useStaggeredAnimation = (
  count: number,
  staggerDelay: number = 50,
  initialDelay: number = 0
): number[] => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const indices: number[] = [];
    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < count; i++) {
      const timeout = setTimeout(() => {
        indices.push(i);
        setVisibleIndices([...indices]);
      }, initialDelay + i * staggerDelay);
      
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [count, staggerDelay, initialDelay]);

  return visibleIndices;
};

/**
 * Utility to generate a random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Hook that returns true after the specified delay
 */
export const useDelayedAppear = (delay: number = 0): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  return isVisible;
};

/**
 * Hook that triggers an animation when element is in viewport
 */
export const useInViewAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 }
): boolean => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
  
  return isInView;
};
