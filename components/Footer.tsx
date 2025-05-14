'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 px-4 flex justify-center items-center">
      <a 
        href="https://x.com/AmlanDEV10" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
      >
        Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by <span className="text-blue-500">Amlan</span>
      </a>
    </footer>
  );
}