'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ClimbVisual from '@/components/ClimbVisual';
import DurationControls from '@/components/DurationControls';
import SessionControls from '@/components/SessionControls';
import Footer from '@/components/Footer';
import { useBreathCycle } from '@/hooks/useBreathCycle';
import Seo from '@/components/Seo';

export default function Home() {
  const breathCycle = useBreathCycle();
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Seo />
      <Header />
      
      {/* Hidden SEO content */}
      <h1 className="sr-only">Breazy – Breathwork & Breathing Exercise App</h1>
      <div className="sr-only">
        <h2>Guided Breathing Exercises</h2>
        <p>Practice mindful breathing with our visual breathwork app. Follow the climbing animation for perfect inhale, hold, and exhale timing.</p>
        
        <h2>Easy to Use Breath Work App</h2>
        <p>No login required. Start your breathing practice instantly with customizable durations for each breath phase.</p>
        
        <h2>Breathe Easy with Visual Guidance</h2>
        <p>Our unique climbing animation helps you maintain proper breathing rhythm for optimal relaxation and mindfulness.</p>
      </div>
      
      <div className="container max-w-lg px-4 flex-1 flex flex-col items-center gap-6 py-8">
        <div className="w-full group">
          <ClimbVisual 
            phase={breathCycle.phase} 
            pathPosition={breathCycle.pathPosition}
            isActive={breathCycle.isActive}
            secondsLeft={breathCycle.secondsLeft}
          />
        </div>
        
        <SessionControls 
          onStart={breathCycle.startSession}
          onPause={breathCycle.pauseSession}
          onReset={breathCycle.resetSession}
          isActive={breathCycle.isActive}
          currentCycle={breathCycle.currentCycle}
          totalCycles={breathCycle.totalCycles}
        />
        
        <DurationControls 
          settings={breathCycle.settings}
          onUpdate={breathCycle.updateSettings}
          disabled={breathCycle.isActive}
        />
      </div>
      
      <Footer />
    </main>
  );
}