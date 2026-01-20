import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    User, MapPin, Receipt, Trophy, Bell, ChefHat,
    ChevronRight, TrendingUp, Star, Settings, Wallet, LogOut
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const stats = [
    { label: "Notas enviadas", value: "127", icon: Receipt },
    { label: "Economia total", value: "R$ 342", icon: TrendingUp },
    { label: "Ranking", value: "#23", icon: Trophy },
];

const menuItems = [
    { icon: Bell, label: "Notificações", badge: "3", path: "/notifications" },
    { icon: Wallet, label: "Finanças Pessoais", highlight: true, path: "/finances" },
    { icon: ChefHat, label: "Receitas", path: "/recipes" },
    { icon: Star, label: "Favoritos", path: "/favorites" },
    { icon: Settings, label: "Configurações", path: "/settings" },
];

export default function Profile() {
    const router = useRouter();
    const primaryColor = 'rgb(0, 112, 75)';

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
                <View className="p-4">
                    {/* Profile Header */}
                    <View className="flex-row items-center gap-4 mb-8">
                        <LinearGradient
                            colors={[primaryColor, 'rgb(0, 140, 95)']}
                            className="w-20 h-20 rounded-full items-center justify-center shadow-md"
                        >
                            <User size={40} color="white" />
                        </LinearGradient>
                        <View>
                            <Text className="text-2xl font-bold text-foreground">Maria Silva</Text>
                            <View className="flex-row items-center gap-1 text-muted-foreground">
                                <MapPin size={16} color="#737373" />
                                <Text className="text-sm text-muted-foreground">São Paulo, SP</Text>
                            </View>
                            <View className="flex-row items-center gap-1 mt-1">
                                <View className="flex-row items-center gap-1 bg-accent/10 px-2 py-0.5 rounded-full">
                                    <Star size={12} color="rgb(245, 158, 11)" fill="rgb(245, 158, 11)" />
                                    <Text className="text-xs font-semibold text-accent">Nível Ouro</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Stats Grid */}
                    <View className="flex-row gap-3 mb-8">
                        {stats.map((stat, index) => (
                            <View
                                key={stat.label}
                                className="flex-1 bg-card rounded-2xl p-4 items-center shadow-sm border border-border/50"
                            >
                                <stat.icon size={20} color={primaryColor} />
                                <Text className="text-xl font-bold text-foreground mt-2">{stat.value}</Text>
                                <Text className="text-[10px] text-muted-foreground text-center" numberOfLines={1}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Finances Banner */}
                    <Pressable
                        onPress={() => router.push("/finances")}
                        className="rounded-2xl mb-6 relative overflow-hidden shadow-md"
                    >
                        <LinearGradient
                            colors={[primaryColor, 'rgba(0, 112, 75, 0.8)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="p-5"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1">
                                    <View className="flex-row items-center gap-2 mb-2">
                                        <Wallet size={20} color="white" />
                                        <Text className="text-lg font-bold text-white">Finanças Pessoais</Text>
                                    </View>
                                    <Text className="text-white/80 text-sm">
                                        Veja sua inflação pessoal, gastos e impostos pagos
                                    </Text>
                                </View>
                                <ChevronRight size={20} color="white" />
                            </View>
                        </LinearGradient>
                    </Pressable>

                    {/* Menu Items */}
                    <View className="gap-2">
                        {menuItems.map((item, index) => (
                            <Pressable
                                key={item.label}
                                onPress={() => router.push(item.path as any)}
                                className="w-full flex-row items-center gap-4 p-4 bg-card rounded-2xl shadow-sm border border-border/50 active:bg-muted"
                            >
                                <View className={`w-10 h-10 rounded-xl items-center justify-center ${item.highlight ? "bg-amber-500/10" : "bg-muted"
                                    }`}>
                                    <item.icon size={20} color={item.highlight ? "rgb(245, 158, 11)" : primaryColor} />
                                </View>
                                <Text className="flex-1 font-bold text-foreground text-sm tracking-tight">{item.label}</Text>
                                {item.badge && (
                                    <View className="px-2 py-0.5 bg-primary rounded-full mr-1">
                                        <Text className="text-white text-[10px] font-bold">{item.badge}</Text>
                                    </View>
                                )}
                                <ChevronRight size={20} color="#737373" />
                            </Pressable>
                        ))}

                        <Pressable className="w-full flex-row items-center gap-4 p-4 bg-card rounded-2xl shadow-sm border border-border/50 active:bg-red-50 mt-4">
                            <View className="w-10 h-10 rounded-xl items-center justify-center bg-red-50">
                                <LogOut size={20} color="#ef4444" />
                            </View>
                            <Text className="flex-1 font-bold text-red-500 text-sm tracking-tight">Sair da conta</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
