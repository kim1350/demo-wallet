import { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components/native';
import { uiSettingsStore } from '@entities/ui-settings';
import { buildTheme } from '@shared/theme';

export const AppThemeProvider = observer(({ children }: { children: ReactNode }) => {
  const theme = buildTheme(uiSettingsStore.mode);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});
