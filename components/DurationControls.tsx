'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { BreathSettings } from '@/hooks/useBreathCycle';

interface DurationControlsProps {
  settings: BreathSettings;
  onUpdate: (settings: Partial<BreathSettings>) => void;
  disabled: boolean;
}

export default function DurationControls({ 
  settings, 
  onUpdate,
  disabled
}: DurationControlsProps) {
  // Local state to track slider values before committing them
  const [localSettings, setLocalSettings] = useState<BreathSettings>(settings);

  // Handle slider value changes
  const handleChange = (key: keyof BreathSettings, value: number[]) => {
    const newValue = value[0];
    setLocalSettings(prev => ({ ...prev, [key]: newValue }));
    onUpdate({ [key]: newValue });
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 rounded-[20px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-glow"></div>
      
      <div className="relative w-full max-w-xl bg-card rounded-2xl p-6 shadow-md border border-border/50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-[minmax(90px,96px)_1fr] items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap text-right w-24 min-w-[90px] block">
                Inhale: {localSettings.inhaleSeconds}s
              </label>
              <div className="w-full">
                <Slider
                  disabled={disabled}
                  min={2}
                  max={10}
                  step={1}
                  value={[localSettings.inhaleSeconds]}
                  onValueChange={(values) => handleChange('inhaleSeconds', values)}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-[minmax(90px,96px)_1fr] items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap text-right w-24 min-w-[90px] block">
                Hold: {localSettings.holdSeconds}s
              </label>
              <div className="w-full">
                <Slider
                  disabled={disabled}
                  min={0}
                  max={10}
                  step={1}
                  value={[localSettings.holdSeconds]}
                  onValueChange={(values) => handleChange('holdSeconds', values)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-[minmax(90px,96px)_1fr] items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap text-right w-24 min-w-[90px] block">
                Exhale: {localSettings.exhaleSeconds}s
              </label>
              <div className="w-full">
                <Slider
                  disabled={disabled}
                  min={2}
                  max={10}
                  step={1}
                  value={[localSettings.exhaleSeconds]}
                  onValueChange={(values) => handleChange('exhaleSeconds', values)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}