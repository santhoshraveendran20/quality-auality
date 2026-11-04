import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'store-theme';
const ThemeContext = createContext({ theme: 'system', resolvedTheme: 'light', setTheme: () => {} });

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  } catch {
    return 'system';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStored);
  const [resolvedTheme, setResolved] = useState(() => (theme === 'system' ? (systemDark() ? 'dark' : 'light') : theme));

  useEffect(() => {
    const apply = () => {
      const next = theme === 'system' ? (systemDark() ? 'dark' : 'light') : theme;
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.style.colorScheme = next;
      setResolved(next);
    };
    apply();
    if (theme !== 'system') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  const setTheme = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setThemeState(next);
  };

  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
