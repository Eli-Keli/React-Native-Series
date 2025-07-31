import { Tabs } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#ADB5BD',
          tabBarStyle: {
            backgroundColor: Colors.card,
            borderTopColor: Colors.border,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
          }}
        />
      </Tabs >
    </>
  );
}
