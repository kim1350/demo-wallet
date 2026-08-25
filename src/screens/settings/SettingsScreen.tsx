import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { CURRENCIES, uiSettingsStore } from 'src/entities/ui-settings';
import { ThemeToggle } from 'src/features/theme-toggle';
import { Card, Screen, Text } from 'src/shared/ui';
import { APP_VERSION } from './constants';

const Head = styled.View`
  margin-bottom: ${({ theme }) => theme.space(5)}px;
`;

const Gap = styled.View`
  height: ${({ theme }) => theme.space(4)}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.space(2)}px;
`;

const Chips = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space(2)}px;
  margin-top: ${({ theme }) => theme.space(3)}px;
`;

const Chip = styled.Pressable<{ active: boolean }>`
  flex: 1;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space(3)}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, active }) => (active ? theme.colors.surfaceAlt : theme.colors.surface)};
`;

export const SettingsScreen = observer(() => (
  <Screen>
    <Head>
      <Text variant="title">Settings</Text>
    </Head>

    <Card>
      <Text
        variant="caption"
        color="textMuted"
      >
        APPEARANCE
      </Text>
      <Row>
        <Text variant="subtitle">Dark theme</Text>
        <ThemeToggle />
      </Row>
    </Card>

    <Gap />

    <Card>
      <Text
        variant="caption"
        color="textMuted"
      >
        DISPLAY CURRENCY
      </Text>
      <Chips>
        {CURRENCIES.map((c) => {
          const active = uiSettingsStore.currency === c.code;
          return (
            <Chip
              key={c.code}
              active={active}
              onPress={() => uiSettingsStore.setCurrency(c.code)}
            >
              <Text
                variant="subtitle"
                color={active ? 'primary' : 'text'}
              >
                {c.symbol} {c.code}
              </Text>
            </Chip>
          );
        })}
      </Chips>
    </Card>

    <Gap />

    <Card>
      <Text
        variant="caption"
        color="textMuted"
      >
        ABOUT
      </Text>
      <Row>
        <Text variant="subtitle">Version</Text>
        <Text
          variant="body"
          color="textMuted"
        >
          {APP_VERSION}
        </Text>
      </Row>
      <Text
        variant="caption"
        color="textMuted"
      >
        A self-contained demo wallet. All data is generated locally — no accounts, no network, no
        real assets.
      </Text>
    </Card>
  </Screen>
));
