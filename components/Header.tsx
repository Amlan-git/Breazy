'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Wind } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="py-6 px-4">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Wind className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Breazy</h1>
          </div>
          <div className="w-10 h-10" />
        </div>
      </header>
    );
  }

  return (
    <header className="py-6 px-4">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <Wind className="h-8 w-8 animate-bounce text-blue-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 text-transparent bg-clip-text animate-pulse">Breazy</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          )}
        </Button>
      </div>
    </header>
  );
}