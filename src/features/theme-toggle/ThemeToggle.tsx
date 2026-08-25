import { Switch } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components/native';
import { uiSettingsStore } from '@entities/ui-settings';

export const ThemeToggle = observer(() => {
  const theme = useTheme();
  const isDark = uiSettingsStore.mode === 'dark';

  return (
    <Switch
      value={isDark}
      onValueChange={() => uiSettingsStore.toggleMode()}
      trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
      thumbColor={theme.colors.surface}
    />
  );
});
