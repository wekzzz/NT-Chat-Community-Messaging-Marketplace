import React, { useState, createContext, useContext } from 'react';
export type ThemeName = 'classic' | 'soft-dim' | 'deep-blue';
export interface ThemeTokens {
  name: ThemeName;
  bgApp: string;
  bgSurface: string;
  bgElevated: string;
  border: string;
  accent: string;
  accentSecondary: string;
  textPrimary: string;
  textMuted: string;
  navBg: string;
  navBorder: string;
  headerBg: string;
  headerBlur: string;
  inputBg: string;
  sentBubble: string;
  receivedBubble: string;
}
const THEMES: Record<ThemeName, ThemeTokens> = {
  classic: {
    name: 'classic',
    bgApp: '#F0F2F5',
    bgSurface: '#FFFFFF',
    bgElevated: '#F8FAFC',
    border: '#E5E7EB',
    accent: '#22C55E',
    accentSecondary: '#16A34A',
    textPrimary: '#111827',
    textMuted: '#6B7280',
    navBg: '#FFFFFF',
    navBorder: '#E5E7EB',
    headerBg: '#FFFFFFCC',
    headerBlur: 'blur(12px)',
    inputBg: '#F3F4F6',
    sentBubble: '#DCF8C6',
    receivedBubble: '#FFFFFF'
  },
  'soft-dim': {
    name: 'soft-dim',
    bgApp: '#1F2937',
    bgSurface: '#374151',
    bgElevated: '#4B5563',
    border: '#4B5563',
    accent: '#10B981',
    accentSecondary: '#059669',
    textPrimary: '#F9FAFB',
    textMuted: '#9CA3AF',
    navBg: '#374151',
    navBorder: '#4B5563',
    headerBg: '#374151CC',
    headerBlur: 'blur(12px)',
    inputBg: '#4B5563',
    sentBubble: '#065F46',
    receivedBubble: '#4B5563'
  },
  'deep-blue': {
    name: 'deep-blue',
    bgApp: '#0F172A',
    bgSurface: '#1E293B',
    bgElevated: '#334155',
    border: '#334155',
    accent: '#3B82F6',
    accentSecondary: '#2563EB',
    textPrimary: '#F8FAFC',
    textMuted: '#94A3B8',
    navBg: '#1E293B',
    navBorder: '#334155',
    headerBg: '#1E293BCC',
    headerBlur: 'blur(12px)',
    inputBg: '#334155',
    sentBubble: '#1E40AF',
    receivedBubble: '#334155'
  }
};
interface ThemeContextType {
  theme: ThemeTokens;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// NOTE: Uses React.ReactNode (not named import) so this never breaks
export function ThemeProvider({ children }: {children: React.ReactNode;}) {
  const [themeName, setThemeName] = useState<ThemeName>('classic');
  const theme = THEMES[themeName];
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme: setThemeName
      }}>

      <div
        style={
        {
          '--bg-app': theme.bgApp,
          '--bg-surface': theme.bgSurface,
          '--bg-elevated': theme.bgElevated,
          '--border': theme.border,
          '--accent': theme.accent,
          '--accent-secondary': theme.accentSecondary,
          '--text-primary': theme.textPrimary,
          '--text-muted': theme.textMuted,
          '--nav-bg': theme.navBg,
          '--sent-bubble': theme.sentBubble,
          '--received-bubble': theme.receivedBubble
        } as React.CSSProperties
        }
        className="contents">

        {children}
      </div>
    </ThemeContext.Provider>);

}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}