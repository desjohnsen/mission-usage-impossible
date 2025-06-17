import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const TabLayout = (): React.ReactElement => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 120,
            padding: 1,
            paddingTop: 5,
          },
          default: {
            height: 120,
            padding: 1,
            paddingTop: 5,
          },
        }),
        tabBarLabelStyle: {
          padding: 5,
        },
      }}
    >
      <Tabs.Screen
        name="unlock"
        options={{
          title: 'Unlock',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="sad" color={color} />,
        }}
      />
      <Tabs.Screen
        name="confuse"
        options={{
          title: 'Confuse',
          tabBarIcon: ({ color }) => <FontAwesome5 size={26} name="meh" color={color} solid />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="happy" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;