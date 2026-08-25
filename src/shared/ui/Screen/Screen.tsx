import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Root, Scroll } from './Screen.styles';
import { ScreenProps } from './Screen.types';

export const Screen = ({ children, scroll = true, ...rest }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const padding = {
    paddingTop: insets.top + theme.space(2),
    paddingBottom: insets.bottom + theme.space(6),
  };

  return (
    <Root>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      {scroll ? (
        <Scroll
          contentContainerStyle={{ paddingHorizontal: theme.space(5), ...padding }}
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {children}
        </Scroll>
      ) : (
        <Root style={{ paddingHorizontal: theme.space(5), ...padding }}>{children}</Root>
      )}
    </Root>
  );
};
