import { ThemeColors } from '@shared/theme';

export type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'caption';

export type ColorKey = keyof Pick<
  ThemeColors,
  'text' | 'textMuted' | 'primary' | 'accent' | 'danger' | 'success' | 'onPrimary'
>;

export interface TextProps {
  variant?: Variant;
  color?: ColorKey;
  weight?: '400' | '500' | '600' | '700';
  align?: 'left' | 'center' | 'right';
}
