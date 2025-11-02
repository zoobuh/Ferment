// Ferment Design System - Color Palette & Theme Configuration
export const colors = {
  // Primary Colors
  mint: {
    400: '#2BD6A5',
    500: '#24c296',
    600: '#1eab85',
  },
  
  // Dark Background Palette
  dark: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#adb5bd',
    400: '#6c757d',
    500: '#495057',
    600: '#343a40',
    700: '#242528', // Dark accent from logo
    800: '#1E1F22', // Main background from logo
    900: '#16171a', // Darker variant
  },
  
  // Semantic Colors
  text: {
    primary: '#ffffff',
    secondary: '#e6e9ec',
    muted: '#a6adb3',
    disabled: '#6c757d',
  },
  
  // UI Colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    strong: 'rgba(255, 255, 255, 0.2)',
  },
  
  // State Colors
  success: '#2bd9a7',
  error: '#f85149',
  warning: '#f0ad4e',
  info: '#58a6ff',
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  glow: '0 0 20px rgba(43, 217, 167, 0.3)',
  glowStrong: '0 0 30px rgba(43, 217, 167, 0.5)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const typography = {
  fontFamily: {
    sans: "'Geist', 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Geist Mono', 'SF Mono', 'Consolas', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
  typography,
};
