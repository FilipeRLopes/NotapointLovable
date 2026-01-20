import { Tabs, useRouter } from 'expo-router';
import { Home, Search, ScanLine, ShoppingCart, User } from 'lucide-react-native';
import { View, Text, TouchableOpacity, TouchableOpacityProps, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#1A1A1A'; // simplified, use theme later
  const activeColor = '#00704B'; // Primary Emerald

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: "#00704B",
        tabBarInactiveTintColor: '#4B5563',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => <Search color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="scanner_placeholder" // Placeholder for the center button
        options={{
          title: 'Escanear',
          tabBarButton: (props) => {
            if (!props) return null;

            // React Navigation may pass null for some event handlers or props (like onLongPress, onBlur, disabled)
            // TouchableOpacity strictly expects undefined for missing values, not null.
            const sanitizedProps: TouchableOpacityProps = {};

            Object.keys(props).forEach((key) => {
              const value = (props as any)[key];
              if (value !== null) {
                (sanitizedProps as any)[key] = value;
              }
            });

            return (
              <TouchableOpacity
                {...sanitizedProps}
                className="items-center justify-center flex-1"
              >

                <View
                  style={{
                    position: 'absolute',
                    top: -28,
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: '#00704B',
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                  }}
                >
                  <ScanLine color="white" size={28} />
                </View>
                <Text style={{
                  color: props.accessibilityState?.selected ? "#00704B" : "#4B5563",
                  fontSize: 11,
                  fontWeight: '500',
                  marginTop: 38
                }}>
                  Escanear
                </Text>
              </TouchableOpacity>
            );
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('scanner'); // Navigate to Root Stack 'scanner'
          },
        })}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
