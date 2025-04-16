
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
}

const AnimatedCounter = ({
  value,
  duration = 1000,
  formatter = (val) => val.toString(),
  className
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const progressRatio = Math.min(easeOutQuad(progress / duration), 1);
      
      setCount(Math.floor(progressRatio * value));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };
    
    // Don't animate small values
    if (value <= 10) {
      setCount(value);
      return;
    }
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);
  
  return <span className={className}>{formatter(count)}</span>;
};

export default AnimatedCounter;
