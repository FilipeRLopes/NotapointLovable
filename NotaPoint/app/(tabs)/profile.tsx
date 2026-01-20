// @ts-nocheck
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
    User as UserIcon, MapPin, Receipt, Trophy, Bell, ChefHat,
    ChevronRight, TrendingUp, Star, Settings as SettingsIcon, Wallet
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const stats = [
    { label: "Notas enviadas", value: "127", icon: Receipt },
    { label: "Economia total", value: "R$ 342", icon: TrendingUp },
    { label: "Ranking", value: "#23", icon: Trophy },
];

const menuItems = [
    { icon: Bell, label: "Notificações", badge: "3", path: "/notifications" },
    { icon: Wallet, label: "Finanças Pessoais", path: "/finances" },
    { icon: ChefHat, label: "Receitas", path: "/recipes" },
];

export default function Profile() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
            <ScrollView
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <Animated.View
                    entering={FadeInDown.duration(600)}
                    className="flex-row items-center gap-5 mb-10"
                >
                    <View className="w-24 h-24 rounded-full bg-primary items-center justify-center shadow-lg border-4 border-white">
                        <UserIcon size={44} color="#FFFFFF" strokeWidth={2} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-3xl font-bold text-[#1A1A1A]">Maria Silva</Text>
                        <View className="flex-row items-center gap-1.5 mt-1.5 opacity-60">
                            <MapPin size={16} color="#1A1A1A" />
                            <Text className="text-base text-[#1A1A1A]">São Paulo, SP</Text>
                        </View>
                        <View className="flex-row items-center gap-1.5 mt-3 bg-[#EAB3081A] self-start px-3 py-1 rounded-full border border-[#EAB30833]">
                            <Star size={14} color="#EAB308" fill="#EAB308" />
                            <Text className="text-xs font-bold text-[#854D0E]">Nível Ouro</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Stats Grid */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(600)}
                    className="flex-row gap-4 mb-10"
                    style={{ flexDirection: 'row' }}
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <View
                                key={stat.label}
                                className="flex-1 bg-white rounded-[24px] p-5 items-center shadow-sm border border-border/10"
                            >
                                <View className="w-10 h-10 rounded-full bg-primary/5 items-center justify-center mb-3">
                                    <Icon size={20} color="#00704B" />
                                </View>
                                <Text className="text-xl font-bold text-[#1A1A1A]">{stat.value}</Text>
                                <Text className="text-[10px] text-muted-foreground text-center font-medium mt-1 leading-tight">{stat.label}</Text>
                            </View>
                        );
                    })}
                </Animated.View>

                {/* Featured Banner */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    className="mb-8"
                >
                    <TouchableOpacity
                        className="w-full bg-[#00704B] rounded-[32px] p-6 overflow-hidden shadow-xl"
                        activeOpacity={0.9}
                        onPress={() => router.push("/finances")}
                    >
                        {/* Abstract background shape */}
                        <View className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />

                        <View className="flex-row items-start justify-between">
                            <View className="flex-1 pr-4">
                                <View className="flex-row items-center gap-2.5 mb-2.5">
                                    <View className="w-8 h-8 rounded-lg bg-white/20 items-center justify-center">
                                        <Wallet size={18} color="#FFFFFF" strokeWidth={2.5} />
                                    </View>
                                    <Text className="text-xl font-bold text-white tracking-tight">Finanças Pessoais</Text>
                                </View>
                                <Text className="text-white/80 text-sm leading-relaxed">
                                    Veja sua inflação pessoal, gastos e impostos pagos de forma detalhada
                                </Text>
                            </View>
                            <View className="bg-white/10 p-2 rounded-full">
                                <ChevronRight size={20} color="#FFFFFF" strokeWidth={3} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                {/* Menu Section Label (Optional, but adds structure) */}
                <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1 mb-4">Ações Rápidas</Text>

                {/* Menu List */}
                <View className="gap-3">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Animated.View
                                key={item.label}
                                entering={FadeInDown.delay(300 + index * 50).duration(600)}
                            >
                                <TouchableOpacity
                                    className="w-full flex-row items-center gap-4 p-5 bg-white rounded-[24px] shadow-sm border border-border/10"
                                    activeOpacity={0.7}
                                    onPress={() => item.path && router.push(item.path)}
                                >
                                    <View className="w-12 h-12 rounded-[16px] items-center justify-center bg-[#F8FAFC]">
                                        <Icon size={24} color="#00704B" strokeWidth={2} />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-base font-bold text-[#1A1A1A]">
                                            {item.label}
                                        </Text>
                                    </View>

                                    <View className="flex-row items-center gap-3">
                                        {item.badge && (
                                            <View className="w-6 h-6 bg-primary rounded-full items-center justify-center">
                                                <Text className="text-[10px] font-bold text-white">{item.badge}</Text>
                                            </View>
                                        )}
                                        <ChevronRight size={20} color="#94A3B8" strokeWidth={2.5} />
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </View>

                {/* Settings & Help Footer */}
                <Animated.View
                    entering={FadeInUp.delay(600).duration(600)}
                    className="mt-10 pt-10 border-t border-border/40"
                >
                    <TouchableOpacity className="flex-row items-center justify-center gap-2 py-3">
                        <SettingsIcon size={18} color="#94A3B8" />
                        <Text className="text-sm font-semibold text-muted-foreground">Configurações da Conta</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
