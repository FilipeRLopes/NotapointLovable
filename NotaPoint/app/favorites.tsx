// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import {
    ArrowLeft, Star, Store, TrendingDown, Heart,
    MapPin, Clock
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPriceUpdateDate } from '@/lib/format-date';
import { Tabs } from '@/components/ui/tabs-custom';
import { cn } from '@/lib/utils';

// Mock Data
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
    }
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
    {
        id: 2,
        name: "Extra Anália Franco",
        address: "R. Regente Feijó, 1739",
        distance: "2.8 km",
        rating: 4.2,
        lastVisit: "Há 1 semana",
    }
];

export default function Favorites() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState(favoriteProducts);
    const [stores, setStores] = useState(favoriteStores);

    const removeProduct = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const removeStore = (id: number) => {
        setStores((prev) => prev.filter((s) => s.id !== id));
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
                    <Text className="text-xl font-bold text-foreground">Favoritos</Text>
                </Animated.View>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    options={[
                        { label: "Produtos", value: "products" },
                        { label: "Lojas", value: "stores" }
                    ]}
                />

                {activeTab === 'products' && (
                    <View className="gap-3">
                        {products.length === 0 ? (
                            <View className="items-center py-12">
                                <Heart size={48} color="#94A3B8" />
                                <Text className="text-muted-foreground mt-4">Nenhum produto favorito</Text>
                            </View>
                        ) : (
                            products.map((product, index) => (
                                <Animated.View
                                    key={product.id}
                                    entering={FadeInRight.delay(index * 50).duration(400)}
                                    className="p-4 bg-card rounded-2xl border border-border/50 flex-row gap-3"
                                >
                                    <Image
                                        source={{ uri: product.image }}
                                        className="w-16 h-16 rounded-xl bg-secondary"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-semibold text-foreground text-sm" numberOfLines={2}>{product.name}</Text>
                                        <View className="flex-row items-center gap-2 mt-1">
                                            <Text className="text-lg font-bold text-foreground">R$ {product.currentPrice.toFixed(2)}</Text>
                                            <View className={cn("px-1.5 py-0.5 rounded", product.priceChange < 0 ? "bg-green-500/10" : "bg-red-500/10")}>
                                                <Text className={cn("text-xs font-bold", product.priceChange < 0 ? "text-green-600" : "text-red-500")}>
                                                    {product.priceChange > 0 ? "+" : ""}{product.priceChange}%
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="flex-row items-center gap-1 mt-1">
                                            <TrendingDown size={12} color="#64748B" />
                                            <Text className="text-xs text-muted-foreground">Menor: R$ {product.lowestPrice.toFixed(2)} • {product.store}</Text>
                                        </View>
                                        {product.updatedAt && (
                                            <View className="flex-row items-center gap-1 mt-1">
                                                <Clock size={10} color="#64748B" />
                                                <Text className="text-[10px] text-muted-foreground">Atualizado em {formatPriceUpdateDate(product.updatedAt)}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => removeProduct(product.id)}
                                        className="p-2"
                                    >
                                        <Star size={20} color="#10B981" fill="#10B981" />
                                    </TouchableOpacity>
                                </Animated.View>
                            ))
                        )}
                    </View>
                )}

                {activeTab === 'stores' && (
                    <View className="gap-3">
                        {stores.length === 0 ? (
                            <View className="items-center py-12">
                                <Store size={48} color="#94A3B8" />
                                <Text className="text-muted-foreground mt-4">Nenhuma loja favorita</Text>
                            </View>
                        ) : (
                            stores.map((store, index) => (
                                <Animated.View
                                    key={store.id}
                                    entering={FadeInRight.delay(index * 50).duration(400)}
                                    className="p-4 bg-card rounded-2xl border border-border/50 flex-row gap-3"
                                >
                                    <View className="w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                                        <Store size={24} color="#10B981" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-semibold text-foreground">{store.name}</Text>
                                        <View className="flex-row items-center gap-1 mt-0.5">
                                            <MapPin size={12} color="#64748B" />
                                            <Text className="text-sm text-muted-foreground">{store.address}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-3 mt-2">
                                            <View className="flex-row items-center gap-1">
                                                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                                                <Text className="text-xs text-muted-foreground">{store.rating}</Text>
                                            </View>
                                            <Text className="text-xs text-muted-foreground">{store.distance}</Text>
                                            <View className="flex-row items-center gap-1">
                                                <Clock size={12} color="#64748B" />
                                                <Text className="text-xs text-muted-foreground">{store.lastVisit}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => removeStore(store.id)}
                                        className="p-2"
                                    >
                                        <Heart size={20} color="#10B981" fill="#10B981" />
                                    </TouchableOpacity>
                                </Animated.View>
                            ))
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
