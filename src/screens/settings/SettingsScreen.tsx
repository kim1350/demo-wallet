import { observer } from 'mobx-react-lite';
import { CURRENCIES, uiSettingsStore } from 'src/entities/ui-settings';
import { ThemeToggle } from 'src/features/theme-toggle';
import { Card, Screen, Text } from 'src/shared/ui';
import { APP_VERSION } from './constants';
import { Chip, Chips, Gap, Row } from './SettingsScreen.styles';

export const SettingsScreen = observer(() => (
  <Screen>
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
