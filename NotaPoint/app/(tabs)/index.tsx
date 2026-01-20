// @ts-nocheck
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScanLine, Bell } from 'lucide-react-native';
import { QuickStats } from '@/components/home/QuickStats';
import { RecentDeals } from '@/components/home/RecentDeals';
// Web used "gradient-primary" class which maps to a linear-gradient CSS.
// In RN, we can use expo-linear-gradient or just a solid color for simplicity if not installed. 
// "gradient-primary" in tailwind.config.ts was "linear-gradient(135deg, hsl(160, 100%, 22%) 0%, hsl(160, 80%, 32%) 100%)"
// I'll stick to 'bg-primary' for now to start, or try importing LinearGradient.
// I didn't install expo-linear-gradient. I will use a styled View.

export default function Index() {
  const router = useRouter();

  const paddingTop = Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) : 0;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(500)}
            className="flex-row justify-between items-center mb-6"
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-[#00704B1A] rounded-[20px] items-center justify-center">
                <ScanLine size={24} color="#00704B" />
              </View>
              <View>
                <Text className="text-xl font-bold text-[#1A1A1A]">NotaPoint</Text>
                <Text className="text-sm text-[#1A1A1A] opacity-60">Olá, Maria!</Text>
              </View>
            </View>


            <TouchableOpacity className="relative w-12 h-12 items-center justify-center rounded-xl hover:bg-secondary transition-colors">
              <Bell size={24} color="#1A1A1A" />
              <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#EAB308] rounded-full border-2 border-white" />
            </TouchableOpacity>
          </Animated.View>

          {/* Quick Scan CTA */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            className="mb-6"
          >
            <TouchableOpacity
              onPress={() => router.push('/scanner')}
              className="w-full h-24 rounded-3xl bg-[#00704B] shadow-xl overflow-hidden"
              activeOpacity={0.9}
            >
              <View className="flex-row items-center gap-4 h-full px-4">
                <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center">
                  <ScanLine size={32} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-white">Escanear Nota</Text>
                  <Text className="text-white/80 text-sm">Contribua com os preços da cidade</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Quick Stats */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            className="mb-6"
          >
            <Text className="text-lg font-bold text-foreground mb-4">Sua economia</Text>
            <QuickStats />
          </Animated.View>

          {/* Recent Deals */}
          <View className="-mx-4">
            <RecentDeals />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
