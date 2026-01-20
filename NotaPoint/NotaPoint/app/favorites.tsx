import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    ArrowLeft, Star, Store, TrendingDown, Heart,
    MapPin, Clock
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { formatPriceUpdateDate } from '@/lib/format-date';

const favoriteProducts = [
    {
        id: 1,
        name: "Leite Integral Piracanjuba 1L",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop",
        currentPrice: 5.99,
        lowestPrice: 4.89,
        store: "Carrefour",
        priceChange: -8,
        updatedAt: new Date(Date.now() - 2 * 3600000),
    },
    {
        id: 2,
        name: "Arroz Tio João 5kg",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
        currentPrice: 24.90,
        lowestPrice: 22.50,
        store: "Extra",
        priceChange: 3,
        updatedAt: new Date(Date.now() - 5 * 3600000),
    },
];

const favoriteStores = [
    {
        id: 1,
        name: "Carrefour Aricanduva",
        address: "Av. Aricanduva, 5555",
        distance: "1.2 km",
        rating: 4.5,
        lastVisit: "Há 2 dias",
    },
];

export default function Favorites() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('products');

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1 px-4">
                {/* Header */}
                <View className="flex-row items-center gap-4 mt-4 mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-xl bg-muted">
                        <ArrowLeft size={20} color="black" />
                    </Pressable>
                    <Text className="text-xl font-bold text-foreground">Favoritos</Text>
                </View>

                {/* Tabs */}
                <View className="flex-row bg-muted rounded-xl p-1 mb-6">
                    <Pressable
                        onPress={() => setActiveTab('products')}
                        className={`flex-1 py-1.5 rounded-lg items-center ${activeTab === 'products' ? "bg-card shadow-sm" : ""}`}
                    >
                        <Text className={`text-xs font-bold ${activeTab === 'products' ? "text-foreground" : "text-muted-foreground"}`}>Produtos</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setActiveTab('stores')}
                        className={`flex-1 py-1.5 rounded-lg items-center ${activeTab === 'stores' ? "bg-card shadow-sm" : ""}`}
                    >
                        <Text className={`text-xs font-bold ${activeTab === 'stores' ? "text-foreground" : "text-muted-foreground"}`}>Lojas</Text>
                    </Pressable>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {activeTab === 'products' ? (
                        <View className="gap-3">
                            {favoriteProducts.map((p) => (
                                <View key={p.id} className="p-4 bg-card rounded-2xl border border-border/50 flex-row gap-4">
                                    <Image source={{ uri: p.image }} className="w-16 h-16 rounded-xl" />
                                    <View className="flex-1">
                                        <Text className="font-bold text-foreground text-sm leading-tight h-10" numberOfLines={2}>{p.name}</Text>
                                        <View className="flex-row items-center gap-2 mt-1">
                                            <Text className="text-lg font-bold text-foreground">R$ {p.currentPrice.toFixed(2).replace(".", ",")}</Text>
                                            <View className={`px-1.5 py-0.5 rounded ${p.priceChange < 0 ? "bg-success/10" : "bg-destructive/10"}`}>
                                                <Text className={`text-[10px] font-bold ${p.priceChange < 0 ? "text-success" : "text-destructive"}`}>
                                                    {p.priceChange > 0 ? "+" : ""}{p.priceChange}%
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="flex-row items-center gap-1 mt-1">
                                            <TrendingDown size={10} color="#9ca3af" />
                                            <Text className="text-[10px] text-muted-foreground">Menor: R$ {p.lowestPrice.toFixed(2).replace(".", ",")} • {p.store}</Text>
                                        </View>
                                    </View>
                                    <Pressable className="p-1">
                                        <Star size={20} color="hsl(160, 100%, 22%)" fill="hsl(160, 100%, 22%)" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View className="gap-3">
                            {favoriteStores.map((s) => (
                                <View key={s.id} className="p-4 bg-card rounded-2xl border border-border/50 flex-row gap-4">
                                    <View className="w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                                        <Store size={24} color="hsl(160, 100%, 22%)" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-foreground">{s.name}</Text>
                                        <View className="flex-row items-center gap-1 mt-0.5">
                                            <MapPin size={10} color="#9ca3af" />
                                            <Text className="text-xs text-muted-foreground" numberOfLines={1}>{s.address}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-3 mt-2">
                                            <View className="flex-row items-center gap-1">
                                                <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                                <Text className="text-[10px] font-bold text-foreground">{s.rating}</Text>
                                            </View>
                                            <Text className="text-[10px] text-muted-foreground">{s.distance}</Text>
                                            <View className="flex-row items-center gap-1">
                                                <Clock size={12} color="#9ca3af" />
                                                <Text className="text-[10px] text-muted-foreground">{s.lastVisit}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Pressable className="p-1">
                                        <Heart size={20} color="hsl(160, 100%, 22%)" fill="hsl(160, 100%, 22%)" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    )}
                    <View className="h-10" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
