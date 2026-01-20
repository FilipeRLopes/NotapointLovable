import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Home, Search, ScanLine, ShoppingCart, User } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { HapticTab } from '@/components/haptic-tab';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  const activeColor = 'rgb(0, 112, 75)'; // #00704B
  const inactiveIconColor = 'rgb(115, 115, 115)'; // #737373
  const inactiveLabelColor = 'rgb(26, 26, 26)'; // #1A1A1A
  const navGradient = ['rgb(0, 112, 75)', 'rgb(0, 140, 95)'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 98,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderTopWidth: 0.8,
          borderTopColor: 'rgba(224, 224, 224, 0.5)',
          paddingBottom: Platform.OS === 'ios' ? 34 : 14,
          elevation: 0,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveIconColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => <Home size={24} color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? activeColor : inactiveLabelColor,
              fontSize: 12,
              fontWeight: '500'
            }}>Início</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, focused }) => <Search size={24} color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? activeColor : inactiveLabelColor,
              fontSize: 12,
              fontWeight: '500'
            }}>Buscar</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ focused }) => (
            <View className="relative -mt-10 items-center justify-center">
              <LinearGradient
                colors={navGradient}
                className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
                style={{
                  shadowColor: activeColor,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <ScanLine size={28} color="white" />
              </LinearGradient>
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? activeColor : inactiveLabelColor,
              fontSize: 12,
              fontWeight: '500',
              marginTop: Platform.OS === 'ios' ? 0 : 4
            }}>Escanear</Text>
          )
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, focused }) => <ShoppingCart size={24} color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? activeColor : inactiveLabelColor,
              fontSize: 12,
              fontWeight: '500'
            }}>Lista</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => <User size={24} color={color} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? activeColor : inactiveLabelColor,
              fontSize: 12,
              fontWeight: '500'
            }}>Perfil</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
