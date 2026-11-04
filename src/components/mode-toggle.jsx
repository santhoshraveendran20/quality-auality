import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import ta from '@/i18n/ta.json';

export function ModeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === 'dark';
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('relative', className)}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={ta.toggleTheme}
      title={ta.toggleTheme}
    >
      <Sun className="size-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
