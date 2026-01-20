// @ts-nocheck
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ArrowRight, Clock, Sparkles } from 'lucide-react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { formatPriceUpdateDate } from '@/lib/format-date';

interface DealProps {
    product: string;
    image: string;
    originalPrice: number;
    dealPrice: number;
    store: string;
    expiresIn?: string;
    updatedAt?: Date;
}

function DealCard({ product, image, originalPrice, dealPrice, store, expiresIn, updatedAt = new Date() }: DealProps) {
    const discount = Math.round(((originalPrice - dealPrice) / originalPrice) * 100);

    return (
        <View className="w-[170px] bg-white rounded-[20px] p-3 border border-[#E0E0E0]/30 ml-4 first:ml-0 shadow-sm">
            {/* Product Image */}
            <View className="relative w-full h-24 rounded-xl overflow-hidden mb-3 bg-[#F8FAFC]">
                <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                />
                <View className="absolute top-1.5 right-1.5 flex-row items-center bg-[#EAB308] px-2 py-1 rounded-full shadow-sm">
                    <Text className="text-[10px] font-bold text-white">-{discount}%</Text>
                </View>
            </View>

            <Text className="font-semibold text-[#1A1A1A] text-xs mb-1 leading-tight h-8" numberOfLines={2}>
                {product}
            </Text>
            <Text className="text-[10px] text-muted-foreground mb-2">{store}</Text>

            <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-base font-bold text-[#00704B]">
                    R$ {dealPrice.toFixed(2).replace(".", ",")}
                </Text>
                <Text className="text-[10px] text-muted-foreground line-through">
                    R$ {originalPrice.toFixed(2).replace(".", ",")}
                </Text>
            </View>

            {expiresIn && (
                <Text className="text-[10px] text-[#EAB308] font-semibold mb-2">Expira em {expiresIn}</Text>
            )}

            <View className="flex-row items-center gap-1 opacity-60">
                <Clock size={10} color="#64748B" />
                <Text className="text-[9px] text-muted-foreground">
                    {formatPriceUpdateDate(updatedAt)}
                </Text>
            </View>
        </View>
    );
}

const deals: DealProps[] = [
    {
        product: "Leite Integral 1L",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
        originalPrice: 6.99,
        dealPrice: 4.49,
        store: "Atacadão",
        expiresIn: "2h",
        updatedAt: new Date(Date.now() - 1800000),
    },
    {
        product: "Café Pilão 500g",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
        originalPrice: 18.90,
        dealPrice: 12.90,
        store: "Carrefour",
        expiresIn: "5h",
        updatedAt: new Date(Date.now() - 3600000),
    },
    {
        product: "Óleo de Soja 900ml",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
        originalPrice: 8.99,
        dealPrice: 5.99,
        store: "Extra",
        expiresIn: "1 dia",
        updatedAt: new Date(Date.now() - 7200000),
    },
];

export function RecentDeals() {
    const router = useRouter();

    return (
        <Animated.View entering={FadeInUp.delay(300).duration(500)}>
            <View className="flex-row items-center justify-between mb-4 px-4">
                <Text className="text-lg font-bold text-[#1A1A1A]">Ofertas em destaque</Text>
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => router.push('/deals')}
                >
                    <Text className="text-sm font-semibold text-[#00704B] mr-1">Ver todas</Text>
                    <ArrowRight size={16} color="#00704B" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
            >
                {deals.map((deal, i) => (
                    <DealCard key={i} {...deal} />
                ))}
            </ScrollView>
        </Animated.View>
    );
}
