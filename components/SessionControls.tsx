'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface SessionControlsProps {
  onStart: (cycles?: number) => void;
  onPause: () => void;
  onReset: () => void;
  isActive: boolean;
  currentCycle: number;
  totalCycles: number;
}

export default function SessionControls({
  onStart,
  onPause,
  onReset,
  isActive,
  currentCycle,
  totalCycles,
}: SessionControlsProps) {
  // Format the cycle display text
  const getCycleText = () => {
    if (totalCycles === 0) {
      return currentCycle > 0 ? `Cycle ${currentCycle} - Breathe Easy !` : 'Breathe Easy !';
    }
    return currentCycle > 0 ? `Cycle ${currentCycle} of ${totalCycles}` : `${totalCycles} cycles`;
  };

  return (
    <div className="w-full p-6 bg-card rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        {/* Cycle Counter */}
        <div className="text-center">
          <p className="text-lg font-medium">{getCycleText()}</p>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {isActive ? (
            <Button onClick={onPause} variant="outline" size="lg">
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </Button>
          ) : (
            <Button onClick={() => onStart(0)} size="lg">
              <Play className="mr-2 h-5 w-5" />
              Start
            </Button>
          )}
          <Button onClick={onReset} variant="secondary" size="lg">
            <RefreshCw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}