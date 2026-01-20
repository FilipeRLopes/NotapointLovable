import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Sparkles, TrendingDown, MapPin, Filter } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { formatPriceUpdateDate } from '@/lib/format-date';

interface Deal {
    id: number;
    product: string;
    image: string;
    originalPrice: number;
    dealPrice: number;
    store: string;
    distance: string;
    expiresIn?: string;
    updatedAt: Date;
}

const allDeals: Deal[] = [
    {
        id: 1,
        product: "Leite Integral Piracanjuba 1L",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
        originalPrice: 6.99,
        dealPrice: 4.49,
        store: "Atacadão",
        distance: "1.2km",
        expiresIn: "2h",
        updatedAt: new Date(Date.now() - 1800000),
    },
    {
        id: 2,
        product: "Café Pilão 500g",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
        originalPrice: 18.90,
        dealPrice: 12.90,
        store: "Carrefour",
        distance: "2.1km",
        expiresIn: "5h",
        updatedAt: new Date(Date.now() - 3600000),
    },
    {
        id: 3,
        product: "Óleo de Soja Soya 900ml",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
        originalPrice: 8.99,
        dealPrice: 5.99,
        store: "Extra",
        distance: "800m",
        expiresIn: "1 dia",
        updatedAt: new Date(Date.now() - 7200000),
    },
    {
        id: 4,
        product: "Arroz Tio João 5kg",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
        originalPrice: 28.50,
        dealPrice: 22.90,
        store: "Atacadão",
        distance: "1.2km",
        expiresIn: "3h",
        updatedAt: new Date(Date.now() - 900000),
    },
];

function DealCard({ deal, index }: { deal: Deal, index: number }) {
    const discount = Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100);

    return (
        <View className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 mb-3">
            <View className="flex-row gap-4">
                {/* Product Image */}
                <View className="w-20 h-20 rounded-xl bg-secondary items-center justify-center overflow-hidden relative">
                    <Image
                        source={{ uri: deal.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    {/* Discount Badge */}
                    <View className="absolute -top-1 -right-1 bg-accent px-1.5 py-0.5 rounded-full flex-row items-center gap-0.5 shadow-sm">
                        <Sparkles size={10} color="black" />
                        <Text className="text-[10px] font-bold text-accent-foreground">-{discount}%</Text>
                    </View>
                </View>

                {/* Product Info */}
                <View className="flex-1 min-w-0">
                    <Text className="font-semibold text-foreground text-base mb-1" numberOfLines={1}>{deal.product}</Text>

                    <View className="flex-row items-center gap-2 mb-2">
                        <Text className="text-2xl font-bold text-primary">
                            R$ {deal.dealPrice.toFixed(2).replace(".", ",")}
                        </Text>
                        <View className="flex-row items-center px-2 py-0.5 rounded-full bg-success/10">
                            <TrendingDown size={14} color="#10b981" />
                            <Text className="text-xs font-bold text-success ml-1">{discount}%</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center gap-1">
                        <MapPin size={12} color="#9ca3af" />
                        <Text className="text-muted-foreground text-xs" numberOfLines={1}>{deal.store} • {deal.distance}</Text>
                    </View>
                </View>
            </View>

            {/* Price comparison and expiration */}
            <View className="mt-3 pt-3 border-t border-border/50 flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                    <Text className="text-xs text-muted-foreground">De</Text>
                    <Text className="text-xs text-muted-foreground line-through">
                        R$ {deal.originalPrice.toFixed(2).replace(".", ",")}
                    </Text>
                </View>
                {deal.expiresIn && (
                    <View className="bg-accent/10 px-2 py-1 rounded-full">
                        <Text className="text-[10px] font-bold text-accent-foreground">Expira em {deal.expiresIn}</Text>
                    </View>
                )}
            </View>

            {/* Price update info */}
            <View className="mt-2 flex-row items-center gap-1">
                <Clock size={10} color="#9ca3af" />
                <Text className="text-[10px] text-muted-foreground">Preço atualizado em {formatPriceUpdateDate(deal.updatedAt)}</Text>
            </View>
        </View>
    );
}

export default function Deals() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="auto" />
            <View className="p-4 flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between mt-4 mb-6">
                    <View className="flex-row items-center gap-4">
                        <Pressable
                            onPress={() => router.back()}
                            className="p-2 rounded-xl bg-muted"
                        >
                            <ArrowLeft size={20} color="black" />
                        </Pressable>
                        <View>
                            <Text className="text-xl font-bold text-foreground">Ofertas em Destaque</Text>
                            <Text className="text-sm text-muted-foreground">{allDeals.length} ofertas disponíveis</Text>
                        </View>
                    </View>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl">
                        <Filter size={18} color="black" />
                    </Button>
                </View>

                {/* Deals Grid */}
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {allDeals.map((deal, index) => (
                        <DealCard key={deal.id} deal={deal} index={index} />
                    ))}
                    <View className="h-10" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
