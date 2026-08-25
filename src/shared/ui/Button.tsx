import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}

const Pressable = styled.Pressable<{ variant: ButtonVariant; disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.surfaceAlt};
`;

export const Button = ({ label, onPress, variant = 'primary', loading, disabled }: ButtonProps) => {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      variant={variant}
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.onPrimary : theme.colors.text}
        />
      ) : (
        <Text
          variant="subtitle"
          color={variant === 'primary' ? 'onPrimary' : 'text'}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};
