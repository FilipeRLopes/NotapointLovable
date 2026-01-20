import { Button } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Bell, ScanLine, ArrowRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View, Pressable, Image, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { QuickStats } from "@/components/home/QuickStats";
import { RecentDeals } from "@/components/home/RecentDeals";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();
  const primaryColor = 'rgb(0, 112, 75)';
  const navGradient = [primaryColor, 'rgb(0, 140, 95)'];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <StatusBar style="auto" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 py-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center gap-3">
              <LinearGradient
                colors={navGradient}
                className="w-12 h-12 rounded-xl items-center justify-center shadow-md"
              >
                <ScanLine size={24} color="white" />
              </LinearGradient>
              <View>
                <Text className="text-xl font-bold text-foreground">NotaPoint</Text>
                <Text className="text-sm text-muted-foreground font-medium">Olá, Maria!</Text>
              </View>
            </View>

            <Pressable className="w-10 h-10 rounded-full items-center justify-center relative">
              <Bell size={24} color="rgb(26, 26, 26)" />
              <View
                className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-background"
                style={{ backgroundColor: 'rgb(245, 158, 11)' }} // Accent primary color
              />
            </Pressable>
          </View>

          {/* Quick Scan CTA */}
          <View className="mb-6">
            <Button
              variant="gradient"
              onPress={() => router.push("/scanner")}
              className="w-full h-20 rounded-2xl shadow-lg"
            >
              <View className="flex-row items-center gap-4 w-full">
                <View className="w-14 h-14 bg-white/20 rounded-xl items-center justify-center">
                  <ScanLine size={28} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-white">Escanear Nota</Text>
                  <Text className="text-white/80 text-sm">Contribua com os preços da cidade</Text>
                </View>
              </View>
            </Button>
          </View>

          {/* Quick Stats section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-foreground mb-4">Sua economia</Text>
            <QuickStats />
          </View>

          {/* Recent Deals */}
          <RecentDeals />

          <View className="h-10" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
