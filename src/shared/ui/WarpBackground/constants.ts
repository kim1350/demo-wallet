import type { ThemeMode } from '@shared/theme';

export const RENDER_SCALE = 1.5;
export const TARGET_FRAME_INTERVAL = 1000 / 30;

export const MAX_FRAME_DELTA = TARGET_FRAME_INTERVAL * 2;
export const ANIMATION_TIME_DIVIDER = 3000;

// Палитра только для WarpBackground — согласована с темой приложения (@shared/theme).
// dark: bg #0E0B1A → surfaceAlt #241D3D → primary #6D5EF6
// light: bg #F6F5FB → surfaceAlt #EFEDF7 → primary tint
const LIGHT_WARP_COLORS = ['#F6F5FB', '#E1DCF7', '#B7ACF2'];
const DARK_WARP_COLORS = ['#0E0B1A', '#241D3D', '#4A3FB0'];

export const WARP_COLORS_BY_THEME: Record<ThemeMode, string[]> = {
  light: LIGHT_WARP_COLORS,
  dark: DARK_WARP_COLORS,
};

export const FALLBACK_WARP_COLORS = DARK_WARP_COLORS;
