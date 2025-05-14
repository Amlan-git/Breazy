'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BreathPhase } from '@/hooks/useBreathCycle';

interface ClimbVisualProps {
  phase: BreathPhase;
  pathPosition: { x: number; y: number };
  isActive: boolean;
  secondsLeft?: number;
}

export default function ClimbVisual({ phase, pathPosition, isActive, secondsLeft }: ClimbVisualProps) {
  const controls = useAnimation();
  const pathRef = useRef<SVGPathElement>(null);
  
  // Update ball position when pathPosition changes
  useEffect(() => {
    if (isActive) {
      controls.start({
        x: pathPosition.x,
        y: pathPosition.y,
        transition: { duration: 0.05, ease: 'linear' }
      });
    }
  }, [controls, pathPosition, isActive]);

  // Get phase text to display
  const getPhaseText = () => {
    if (!isActive) return 'Press Start';
    
    const count = secondsLeft !== undefined ? ` ${secondsLeft}` : '';
    switch (phase) {
      case 'inhale':
        return `Inhale${count}`;
      case 'hold':
        return `Hold${count}`;
      case 'exhale':
        return `Exhale${count}`;
      default:
        return 'Press Start';
    }
  };
  
  // Get phase color based on the current phase
  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'text-chart-1';
      case 'hold':
        return 'text-chart-2';
      case 'exhale':
        return 'text-chart-3';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="relative w-full">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 rounded-[20px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-glow"></div>
      
      <div className="relative w-full aspect-[2/1] flex flex-col items-center bg-card rounded-2xl p-6 shadow-md border border-border/50 backdrop-blur-sm">
        {/* Phase text */}
        <div 
          className={`mb-6 text-2xl font-semibold transition-colors duration-300 ${getPhaseColor()}`}
        >
          {getPhaseText()}
        </div>
        
        {/* SVG Container */}
        <svg 
          viewBox="0 0 400 200" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Path */}
          <path
            ref={pathRef}
            d="M20,180 L180,60 L240,60 L380,180"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-40"
          />
          
          {/* Animated ball */}
          <motion.circle
            animate={controls}
            initial={{ x: 20, y: 180 }}
            r="8"
            className="fill-primary"
            filter="url(#shadow)"
          />
          
          {/* Shadow filter */}
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow 
                dx="0" 
                dy="2" 
                stdDeviation="2" 
                floodOpacity="0.3" 
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}