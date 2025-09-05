import { Check, Palette } from 'lucide-react';
import { useTheme, type Theme } from '@/contexts/ThemeContext';

const themes: { id: Theme; name: string; description: string; colors: { light: string; dark: string } }[] = [
  {
    id: 'neutral',
    name: 'Neutral',
    description: 'Balanced, professional',
    colors: { light: 'bg-slate-100', dark: 'bg-slate-700' }
  },
  {
    id: 'calm-green',
    name: 'Calm Green',
    description: 'Fresh, focus-friendly',
    colors: { light: 'bg-emerald-100', dark: 'bg-emerald-700' }
  },
  {
    id: 'soft-purple',
    name: 'Soft Purple',
    description: 'Futuristic, AI-inspired',
    colors: { light: 'bg-purple-100', dark: 'bg-purple-700' }
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Clean, modern, productive',
    colors: { light: 'bg-cyan-100', dark: 'bg-cyan-700' }
  },
  {
    id: 'warm-neutral',
    name: 'Warm Neutral',
    description: 'Friendly, lifestyle-oriented',
    colors: { light: 'bg-amber-100', dark: 'bg-amber-700' }
  }
];

export function ThemeSelector() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-ai-primary/10 flex items-center justify-center">
          <Palette className="w-4 h-4 text-ai-primary" />
        </div>
        <div>
          <h3 className="text-subheading font-medium text-text-primary">Color Theme</h3>
          <p className="text-caption text-text-muted">Choose your preferred accent colors</p>
        </div>
      </div>

      <div className="grid gap-3">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`p-4 rounded-lg border transition-smooth text-left hover:border-ai-primary/30 ${
              theme === themeOption.id
                ? 'border-ai-primary bg-ai-primary/5'
                : 'border-glass-border bg-surface/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className={`w-4 h-4 rounded-full ${themeOption.colors.light} border border-glass-border`} />
                  <div className={`w-4 h-4 rounded-full ${themeOption.colors.dark} border border-glass-border`} />
                </div>
                <div>
                  <p className="text-body font-medium text-text-primary">{themeOption.name}</p>
                  <p className="text-caption text-text-muted">{themeOption.description}</p>
                </div>
              </div>
              {theme === themeOption.id && (
                <Check className="w-5 h-5 text-ai-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}