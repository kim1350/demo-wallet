import { useEffect } from 'react';
import { View } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { uiSettingsStore } from '@entities/ui-settings';
import { WarpBackground } from '@shared/ui';
import { queryClient } from './providers/queryClient';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { RootNavigator } from './navigation/RootNavigator';

export const App = () => {
  useEffect(() => {
    uiSettingsStore.init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <AppThemeProvider>
              <View style={{ flex: 1 }}>
                <WarpBackground />
                <RootNavigator />
              </View>
            </AppThemeProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};
