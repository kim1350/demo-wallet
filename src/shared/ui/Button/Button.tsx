import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Text } from '../Text';
import { Pressable } from './Button.styles';
import { ButtonProps } from './Button.types';

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
