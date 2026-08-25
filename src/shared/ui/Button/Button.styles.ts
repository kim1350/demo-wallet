import styled from 'styled-components/native';
import { ButtonVariant } from './Button.types';

export const Pressable = styled.Pressable<{ variant: ButtonVariant; disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.surfaceAlt};
`;
