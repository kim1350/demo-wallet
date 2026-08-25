export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  primary: string;
  onPrimary: string;
  accent: string;
  text: string;
  textMuted: string;
  success: string;
  danger: string;
  skeleton: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  radius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  space: (n: number) => number;
}
