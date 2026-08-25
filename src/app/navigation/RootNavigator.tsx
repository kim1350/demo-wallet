import { DefaultTheme, NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { Icon, IconName } from 'src/shared/ui';
import { HomeScreen } from 'src/screens/home';
import { SendScreen } from 'src/screens/send';
import { SettingsScreen } from 'src/screens/settings';

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
      background: theme.colors.bg,
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
          headerShown: false,
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
        />
        <Tab.Screen
          name="Send"
          component={SendScreen}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
