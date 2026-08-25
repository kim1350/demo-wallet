import { DefaultTheme, NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { Header, Icon, IconName } from '@shared/ui';
import { HomeScreen } from '@screens/home';
import { SendScreen } from '@screens/send';
import { SettingsScreen } from '@screens/settings';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, IconName> = {
  Home: 'home',
  Send: 'send',
  Settings: 'settings',
};

export const RootNavigator = () => {
  const theme = useTheme();

  const navTheme: NavTheme = {
    ...DefaultTheme,
    dark: theme.mode === 'dark',
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={ICONS[route.name] ?? 'home'}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => (
              <Header
                title="demo·wallet"
                showLogo
              />
            ),
          }}
        />
        <Tab.Screen
          name="Send"
          component={SendScreen}
          options={{
            header: () => (
              <Header
                title="Send"
                subtitle="Transfer assets to any address"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ header: () => <Header title="Settings" /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
