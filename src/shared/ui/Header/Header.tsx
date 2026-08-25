import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { LogoMark } from '../Logo';
import { Text } from '../Text';
import { Container, Titles } from './Header.styles';
import { HeaderProps } from './Header.types';

export const Header = ({ title, subtitle, showLogo }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Container style={{ paddingTop: insets.top + theme.space(2) }}>
      {showLogo && <LogoMark size={32} />}
      <Titles>
        <Text
          variant="title"
          weight="700"
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            variant="body"
            color="textMuted"
          >
            {subtitle}
          </Text>
        )}
      </Titles>
    </Container>
  );
};
