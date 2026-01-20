import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { ArrowRight, Clock, Sparkles } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { formatPriceUpdateDate } from '@/lib/format-date';
import { useRouter } from 'expo-router';

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
        <View className="w-48 bg-card rounded-2xl p-3 border border-border/50 mr-4 shadow-sm">
            {/* Product Image */}
            <View className="relative w-full h-28 rounded-xl overflow-hidden mb-3 bg-muted">
                <Image
                    source={{ uri: image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View className="absolute top-2 right-2 flex-row items-center gap-0.5 bg-accent px-2 py-0.5 rounded-full shadow-sm">
                    <Sparkles size={10} color="black" />
                    <Text className="text-[10px] font-bold text-accent-foreground">-{discount}%</Text>
                </View>
            </View>

            <Text className="font-bold text-foreground text-sm mb-1 leading-tight" numberOfLines={1}>
                {product}
            </Text>
            <View className="flex-row items-center gap-1 mb-2">
                <Text className="text-[10px] text-muted-foreground" numberOfLines={1}>{store}</Text>
            </View>

            <View className="flex-row items-center gap-2 mb-2">
                <Text className="text-xl font-bold text-primary">
                    R$ {dealPrice.toFixed(2).replace(".", ",")}
                </Text>
                <Text className="text-[10px] text-muted-foreground line-through">
                    R$ {originalPrice.toFixed(2).replace(".", ",")}
                </Text>
            </View>

            <View className="flex-row justify-between items-center mt-auto">
                <View className="flex-row items-center gap-1">
                    <Clock size={10} color="#9ca3af" />
                    <Text className="text-[8px] text-muted-foreground">
                        {expiresIn ? `Expira em ${expiresIn}` : `Há ${formatPriceUpdateDate(updatedAt)}`}
                    </Text>
                </View>
                <Pressable className="bg-primary/10 p-1.5 rounded-lg">
                    <ArrowRight size={14} color="hsl(160, 100%, 22%)" />
                </Pressable>
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
        <View className="mt-2">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-foreground">Ofertas em destaque</Text>
                <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => router.push('/deals' as any)}
                >
                    <View className="flex-row items-center gap-1">
                        <Text className="text-primary text-sm font-medium">Ver todas</Text>
                        <ArrowRight size={16} color="hsl(160, 100%, 22%)" />
                    </View>
                </Button>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
                {deals.map((deal, i) => (
                    <DealCard key={i} {...deal} />
                ))}
                <View className="w-4" />
            </ScrollView>
        </View>
    );
}
