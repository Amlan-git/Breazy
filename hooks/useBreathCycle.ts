'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'idle';

export interface BreathSettings {
  inhaleSeconds: number;
  holdSeconds: number;
  exhaleSeconds: number;
}

export interface BreathCycleState {
  phase: BreathPhase;
  progress: number;
  phaseProgress: number;
  currentCycle: number;
  totalCycles: number;
  settings: BreathSettings;
  isActive: boolean;
  secondsLeft?: number;
}

export interface UseBreathCycleResult extends BreathCycleState {
  startSession: (cycles?: number) => void;
  pauseSession: () => void;
  resetSession: () => void;
  updateSettings: (newSettings: Partial<BreathSettings>) => void;
  pathPosition: { x: number; y: number };
}

const DEFAULT_SETTINGS: BreathSettings = {
  inhaleSeconds: 4,
  holdSeconds: 4,
  exhaleSeconds: 4,
};

export function useBreathCycle(
  initialSettings: Partial<BreathSettings> = {}
): UseBreathCycleResult {
  const [settings, setSettings] = useState<BreathSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });

  const [state, setState] = useState<Omit<BreathCycleState, 'settings'>>({
    phase: 'idle',
    progress: 0,
    phaseProgress: 0,
    currentCycle: 0,
    totalCycles: 0,
    isActive: false,
    secondsLeft: undefined,
  });

  const cycleDuration = useMemo(
    () => settings.inhaleSeconds + settings.holdSeconds + settings.exhaleSeconds,
    [settings]
  );

  const phaseRanges = useMemo(() => {
    const inhaleEnd = settings.inhaleSeconds / cycleDuration;
    const holdEnd = (settings.inhaleSeconds + settings.holdSeconds) / cycleDuration;
    return {
      inhale: { start: 0, end: inhaleEnd },
      hold: { start: inhaleEnd, end: holdEnd },
      exhale: { start: holdEnd, end: 1 },
    };
  }, [cycleDuration, settings]);

  const calculateState = useCallback(
    (progress: number) => {
      let phase: BreathPhase = 'idle';
      let phaseProgress = 0;
      let secondsLeft: number | undefined;

      if (progress < phaseRanges.inhale.end) {
        phase = 'inhale';
        phaseProgress = progress / phaseRanges.inhale.end;
        secondsLeft = Math.ceil(settings.inhaleSeconds * (1 - phaseProgress));
      } else if (progress < phaseRanges.hold.end) {
        phase = 'hold';
        phaseProgress = (progress - phaseRanges.hold.start) / (phaseRanges.hold.end - phaseRanges.hold.start);
        secondsLeft = Math.ceil(settings.holdSeconds * (1 - phaseProgress));
      } else {
        phase = 'exhale';
        phaseProgress = (progress - phaseRanges.exhale.start) / (phaseRanges.exhale.end - phaseRanges.exhale.start);
        secondsLeft = Math.ceil(settings.exhaleSeconds * (1 - phaseProgress));
      }

      return { phase, phaseProgress, secondsLeft };
    },
    [phaseRanges, settings]
  );

  useEffect(() => {
    if (!state.isActive) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const cycleProgress = (elapsed / 1000) % cycleDuration;
      const normalizedProgress = cycleProgress / cycleDuration;

      const currentCycle = Math.floor(elapsed / 1000 / cycleDuration) + 1;
      const isComplete = state.totalCycles > 0 && currentCycle > state.totalCycles;

      if (isComplete) {
        setState((prev) => ({
          ...prev,
          phase: 'idle',
          progress: 0,
          phaseProgress: 0,
          isActive: false,
          secondsLeft: undefined,
        }));
        return;
      }

      const { phase, phaseProgress, secondsLeft } = calculateState(normalizedProgress);

      setState((prev) => ({
        ...prev,
        phase,
        progress: normalizedProgress,
        phaseProgress,
        currentCycle,
        secondsLeft,
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state.isActive, state.totalCycles, cycleDuration, calculateState]);

  const pathPosition = useMemo(() => {
    let x = 0;
    let y = 0;

    const start = { x: 20, y: 180 };
    const peakStart = { x: 180, y: 60 };
    const peakEnd = { x: 240, y: 60 };
    const end = { x: 380, y: 180 };

    if (state.phase === 'inhale') {
      x = start.x + (peakStart.x - start.x) * state.phaseProgress;
      y = start.y + (peakStart.y - start.y) * state.phaseProgress;
    } else if (state.phase === 'hold') {
      x = peakStart.x + (peakEnd.x - peakStart.x) * state.phaseProgress;
      y = peakStart.y;
    } else if (state.phase === 'exhale') {
      x = peakEnd.x + (end.x - peakEnd.x) * state.phaseProgress;
      y = peakEnd.y + (end.y - peakEnd.y) * state.phaseProgress;
    } else {
      x = start.x;
      y = start.y;
    }

    return { x, y };
  }, [state.phase, state.phaseProgress]);

  const startSession = useCallback((cycles = 0) => {
    setState((prev) => ({
      ...prev,
      isActive: true,
      totalCycles: cycles,
      currentCycle: prev.phase === 'idle' ? 1 : prev.currentCycle,
    }));
  }, []);

  const pauseSession = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: false }));
  }, []);

  const resetSession = useCallback(() => {
    setState({
      phase: 'idle',
      progress: 0,
      phaseProgress: 0,
      currentCycle: 0,
      totalCycles: 0,
      isActive: false,
      secondsLeft: undefined,
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<BreathSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return {
    ...state,
    settings,
    startSession,
    pauseSession,
    resetSession,
    updateSettings,
    pathPosition,
  };
}