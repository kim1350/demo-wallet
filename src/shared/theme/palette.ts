import { Theme, ThemeColors, ThemeMode } from './types';

const dark: ThemeColors = {
  bg: '#0E0B1A',
  surface: '#1A1530',
  surfaceAlt: '#241D3D',
  border: '#2C2547',
  primary: '#6D5EF6',
  onPrimary: '#FFFFFF',
  accent: '#3FE0D0',
  text: '#F2F0FA',
  textMuted: '#9B95B8',
  success: '#3FE0D0',
  danger: '#F6607B',
  skeleton: '#2C2547',
};

const light: ThemeColors = {
  bg: '#F6F5FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EFEDF7',
  border: '#E4E1F0',
  primary: '#6D5EF6',
  onPrimary: '#FFFFFF',
  accent: '#17B9AC',
  text: '#171327',
  textMuted: '#6E6890',
  success: '#17B9AC',
  danger: '#E23E5C',
  skeleton: '#E4E1F0',
};

const base = {
  radius: { sm: 8, md: 14, lg: 22, pill: 999 },
  space: (n: number) => n * 4,
};

const palettes: Record<ThemeMode, ThemeColors> = { light, dark };

export const buildTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: palettes[mode],
  ...base,
});
