// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import {
    ArrowLeft, Bell, TrendingDown, Package, Gift,
    AlertCircle, Check, Trash2
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Notification {
    id: number;
    type: "price_drop" | "deal" | "product" | "system";
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const initialNotifications: Notification[] = [
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
        type: "product",
        title: "Produto disponível",
        description: "Café Pilão voltou ao estoque no Pão de Açúcar",
        time: "Ontem",
        read: false,
    },
    {
        id: 4,
        type: "system",
        title: "Parabéns!",
        description: "Você subiu para o Nível Ouro! Continue contribuindo.",
        time: "2 dias atrás",
        read: true,
    },
    {
        id: 5,
        type: "price_drop",
        title: "Alerta de preço",
        description: "Feijão Carioca está no menor preço dos últimos 30 dias",
        time: "3 dias atrás",
        read: true,
    },
];

const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "price_drop": return TrendingDown;
        case "deal": return Gift;
        case "product": return Package;
        case "system": return AlertCircle;
        default: return Bell;
    }
};

const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
        case "price_drop": return "bg-green-500/10";
        case "deal": return "bg-amber-500/10";
        case "product": return "bg-blue-500/10";
        case "system": return "bg-primary/10";
        default: return "bg-secondary";
    }
};

const getIconColor = (type: Notification["type"]) => {
    switch (type) {
        case "price_drop": return "#16A34A";
        case "deal": return "#D97706";
        case "product": return "#2563EB";
        case "system": return "#10B981";
        default: return "#64748B";
    }
};

export default function Notifications() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                {/* Header */}
                <Animated.View entering={FadeInDown.duration(400)} className="flex-row items-center gap-4 mb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 rounded-xl bg-secondary"
                    >
                        <ArrowLeft size={24} color="#000000" />
                    </TouchableOpacity>
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-foreground">Notificações</Text>
                        {unreadCount > 0 && (
                            <Text className="text-sm text-muted-foreground">
                                {unreadCount} não lida{unreadCount > 1 ? "s" : ""}
                            </Text>
                        )}
                    </View>
                    {unreadCount > 0 && (
                        <TouchableOpacity
                            onPress={markAllAsRead}
                            className="flex-row items-center gap-1 opacity-80"
                        >
                            <Check size={16} color="#10B981" />
                            <Text className="text-primary text-sm font-medium">Marcar todas</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>

                {/* List */}
                <View className="gap-3">
                    {notifications.length === 0 ? (
                        <View className="items-center py-12">
                            <Bell size={48} color="#94A3B8" />
                            <Text className="text-muted-foreground mt-4">Nenhuma notificação</Text>
                        </View>
                    ) : (
                        notifications.map((notification, index) => {
                            const Icon = getNotificationIcon(notification.type);
                            const bgClass = getNotificationColor(notification.type);
                            const iconColor = getIconColor(notification.type);

                            return (
                                <Animated.View
                                    key={notification.id}
                                    entering={FadeInRight.delay(index * 50).duration(400)}
                                    className={cn(
                                        "relative p-4 bg-card rounded-2xl border flex-row gap-3",
                                        notification.read ? "border-border/50" : "border-primary/30 bg-primary/5"
                                    )}
                                >
                                    {!notification.read && (
                                        <View className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary z-10" />
                                    )}

                                    <TouchableOpacity
                                        className={cn("w-10 h-10 rounded-xl items-center justify-center flex-shrink-0", bgClass)}
                                        activeOpacity={1}
                                    >
                                        <Icon size={20} color={iconColor} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="flex-1"
                                        onPress={() => markAsRead(notification.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text className="font-semibold text-foreground">{notification.title}</Text>
                                        <Text className="text-sm text-muted-foreground mt-0.5 leading-5">{notification.description}</Text>
                                        <Text className="text-xs text-muted-foreground mt-2">{notification.time}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => deleteNotification(notification.id)}
                                        className="p-1 self-start"
                                    >
                                        <Trash2 size={16} color="#94A3B8" />
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
