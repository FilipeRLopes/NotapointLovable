import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    ArrowLeft, Bell, TrendingDown, Package, Gift,
    AlertCircle, Check, Trash2
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';

const initialNotifications = [
    {
        id: 1,
        type: "price_drop",
        title: "Queda de preço!",
        description: "Leite Integral Piracanjuba baixou 15% no Carrefour",
        time: "Há 2 horas",
        read: false,
    },
    {
        id: 2,
        type: "deal",
        title: "Oferta especial",
        description: "Arroz Tio João com 20% de desconto no Extra",
        time: "Há 5 horas",
        read: false,
    },
    {
        id: 3,
        type: "system",
        title: "Parabéns!",
        description: "Você subiu para o Nível Ouro! Continue contribuindo.",
        time: "2 dias atrás",
        read: true,
    },
];

const getNotificationIcon = (type: string) => {
    switch (type) {
        case "price_drop": return TrendingDown;
        case "deal": return Gift;
        case "product": return Package;
        case "system": return AlertCircle;
        default: return Bell;
    }
};

const getNotificationColor = (type: string) => {
    switch (type) {
        case "price_drop": return { bg: "bg-success/10", text: "#10b981" };
        case "deal": return { bg: "bg-amber-500/10", text: "#f59e0b" };
        case "product": return { bg: "bg-blue-500/10", text: "#3b82f6" };
        case "system": return { bg: "bg-primary/10", text: "hsl(160, 100%, 22%)" };
        default: return { bg: "bg-muted", text: "#9ca3af" };
    }
};

export default function Notifications() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(initialNotifications);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1 px-4">
                {/* Header */}
                <View className="flex-row items-center gap-4 mt-4 mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-xl bg-muted">
                        <ArrowLeft size={20} color="black" />
                    </Pressable>
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-foreground">Notificações</Text>
                        <Text className="text-sm text-muted-foreground">{unreadCount} não lidas</Text>
                    </View>
                    {unreadCount > 0 && (
                        <Pressable className="bg-primary/10 px-3 py-1.5 rounded-full">
                            <Text className="text-[10px] font-bold text-primary">Marcar todas</Text>
                        </Pressable>
                    )}
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {notifications.map((n, i) => {
                        const Icon = getNotificationIcon(n.type);
                        const { bg, text } = getNotificationColor(n.type);

                        return (
                            <View key={n.id} className={`p-4 rounded-2xl border mb-3 flex-row gap-4 ${n.read ? "bg-card border-border/50" : "bg-primary/5 border-primary/20"}`}>
                                <View className={`w-10 h-10 rounded-xl items-center justify-center ${bg}`}>
                                    <Icon size={20} color={text} />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-center mb-1">
                                        <Text className="font-bold text-sm text-foreground">{n.title}</Text>
                                        {!n.read && <View className="w-2 h-2 rounded-full bg-primary" />}
                                    </View>
                                    <Text className="text-xs text-muted-foreground leading-4">{n.description}</Text>
                                    <Text className="text-[10px] text-muted-foreground mt-2">{n.time}</Text>
                                </View>
                                <Pressable className="p-1">
                                    <Trash2 size={16} color="#9ca3af" />
                                </Pressable>
                            </View>
                        );
                    })}
                    <View className="h-10" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
