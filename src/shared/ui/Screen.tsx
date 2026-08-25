import { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

interface ScreenProps extends ScrollViewProps {
  children: ReactNode;
  scroll?: boolean;
}

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
