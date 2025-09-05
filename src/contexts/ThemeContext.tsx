import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'neutral' | 'calm-green' | 'soft-purple' | 'ocean-blue' | 'warm-neutral';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('neutral');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme and dark mode preference
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    const savedDark = localStorage.getItem('app-dark-mode') === 'true';
    
    if (savedTheme) setTheme(savedTheme);
    setIsDark(savedDark);
  }, []);

  useEffect(() => {
    // Apply theme class to document
    const themeClass = theme === 'neutral' ? '' : `theme-${theme}`;
    const darkClass = isDark ? 'dark' : '';
    
    // Remove all theme classes
    document.documentElement.classList.remove(
      'theme-calm-green', 
      'theme-soft-purple', 
      'theme-ocean-blue', 
      'theme-warm-neutral',
      'dark'
    );
    
    // Apply current theme and dark mode
    if (themeClass) document.documentElement.classList.add(themeClass);
    if (darkClass) document.documentElement.classList.add(darkClass);
    
    // Save to localStorage
    localStorage.setItem('app-theme', theme);
    localStorage.setItem('app-dark-mode', isDark.toString());
  }, [theme, isDark]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}