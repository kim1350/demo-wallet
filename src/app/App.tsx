import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { uiSettingsStore } from 'src/entities/ui-settings';
import { queryClient } from './providers/queryClient';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { RootNavigator } from './navigation/RootNavigator';

export const App = () => {
  useEffect(() => {
    uiSettingsStore.init();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <RootNavigator />
        </AppThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
