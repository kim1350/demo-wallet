import styled from 'styled-components/native';
import { ThemeColors } from 'src/shared/theme';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'caption';
type ColorKey = keyof Pick<
  ThemeColors,
  'text' | 'textMuted' | 'primary' | 'accent' | 'danger' | 'success' | 'onPrimary'
>;

interface TextProps {
  variant?: Variant;
  color?: ColorKey;
  weight?: '400' | '500' | '600' | '700';
  align?: 'left' | 'center' | 'right';
}

const SIZES: Record<Variant, { size: number; line: number; weight: TextProps['weight'] }> = {
  display: { size: 34, line: 40, weight: '700' },
  title: { size: 22, line: 28, weight: '700' },
  subtitle: { size: 17, line: 22, weight: '600' },
  body: { size: 15, line: 20, weight: '400' },
  caption: { size: 13, line: 18, weight: '500' },
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme, color }) => theme.colors[color ?? 'text']};
  font-size: ${({ variant }) => SIZES[variant ?? 'body'].size}px;
  line-height: ${({ variant }) => SIZES[variant ?? 'body'].line}px;
  font-weight: ${({ variant, weight }) => weight ?? SIZES[variant ?? 'body'].weight};
  text-align: ${({ align }) => align ?? 'left'};
`;
