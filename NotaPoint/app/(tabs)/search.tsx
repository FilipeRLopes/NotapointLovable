import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight, Layout } from 'react-native-reanimated';
import {
    Search as SearchIcon,
    ShoppingBasket,
    Pill,
    GlassWater,
    Leaf,
    MapPin,
    Clock,
    Filter
} from 'lucide-react-native';
import { formatPriceUpdateDate } from '@/lib/format-date';

const { width } = Dimensions.get('window');

const categories = [
    { id: '1', name: 'Todos', icon: SearchIcon },
    { id: '2', name: 'Mercado', icon: ShoppingBasket },
    { id: '3', name: 'Farmácia', icon: Pill },
    { id: '4', name: 'Bebidas', icon: GlassWater },
    { id: '5', name: 'Hortifruti', icon: Leaf },
];

const mockProducts = [
    {
        id: '1',
        name: 'Arroz Tio João 5kg',
        price: 22.90,
        discount: 20,
        store: 'Atacadão',
        distance: '1.2km',
        averagePrice: 28.50,
        updatedAt: new Date(),
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop'
    },
    {
        id: '2',
        name: 'Leite Integral 1L',
        price: 4.49,
        discount: 25,
        store: 'Supermercado BomPreço',
        distance: '800m',
        averagePrice: 5.99,
        updatedAt: new Date(Date.now() - 3600000),
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop'
    },
    {
        id: '3',
        name: 'Café Pilão 500g',
        price: 12.90,
        discount: 30,
        store: 'Carrefour',
        distance: '2.5km',
        averagePrice: 18.90,
        updatedAt: new Date(Date.now() - 7200000),
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop'
    },
    {
        id: '4',
        name: 'Detergente Ipê 500ml',
        price: 1.99,
        discount: 15,
        store: 'Extra',
        distance: '1.5km',
        averagePrice: 2.35,
        updatedAt: new Date(Date.now() - 10800000),
        image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=200&h=200&fit=crop'
    },
    {
        id: '5',
        name: 'Óleo de Soja 900ml',
        price: 5.99,
        discount: 33,
        store: 'Atacadão',
        distance: '1.2km',
        averagePrice: 8.99,
        updatedAt: new Date(Date.now() - 14400000),
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop'
    }
];

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('1');

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <View className="px-6 py-4">
                {/* Header */}
                <Animated.View entering={FadeInDown.duration(600)}>
                    <Text className="text-2xl font-bold text-foreground">Buscar produtos</Text>
                    <Text className="text-muted-foreground text-sm mb-6">Compare preços na sua cidade</Text>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(600)}
                    className="flex-row items-center bg-card border border-border/50 rounded-2xl px-4 py-3 mb-6 shadow-sm"
                >
                    <SearchIcon size={20} color="#94A3B8" />
                    <TextInput
                        placeholder="Buscar produto..."
                        placeholderTextColor="#94A3B8"
                        className="flex-1 ml-3 text-foreground text-base"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity className="ml-2">
                        <Filter size={20} color="#00704B" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Categories */}
                <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-6 -mx-6 px-6"
                    >
                        <View className="flex-row gap-3 pr-12">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = selectedCategory === category.id;
                                return (
                                    <TouchableOpacity
                                        key={category.id}
                                        onPress={() => setSelectedCategory(category.id)}
                                        className={`flex-row items-center px-4 py-2 rounded-full border transition-all ${isActive
                                                ? 'bg-primary border-primary'
                                                : 'bg-card border-border/50'
                                            }`}
                                    >
                                        <Icon size={16} color={isActive ? '#FFFFFF' : '#64748B'} className="mr-2" />
                                        <Text className={`font-medium text-sm ${isActive ? 'text-white' : 'text-muted-foreground'
                                            }`}>
                                            {category.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                </Animated.View>

                {/* Results Info */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(600)}
                    className="mb-4"
                >
                    <Text className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        {mockProducts.length} produtos encontrados
                    </Text>
                </Animated.View>
            </View>

            {/* Products List */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {mockProducts.map((product, index) => (
                    <Animated.View
                        key={product.id}
                        entering={FadeInRight.delay(400 + index * 100).duration(500)}
                        layout={Layout.springify()}
                        className="bg-card border border-border/50 rounded-2xl p-4 mb-4 shadow-sm"
                    >
                        <View className="flex-row items-start gap-4">
                            {/* Product Image */}
                            <View className="w-24 h-24 bg-muted/30 rounded-xl overflow-hidden items-center justify-center">
                                <Image
                                    source={{ uri: product.image }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>

                            {/* Product Info */}
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-foreground mb-1" numberOfLines={1}>
                                    {product.name}
                                </Text>

                                <View className="flex-row items-center gap-2 mb-2">
                                    <Text className="text-xl font-bold text-primary">
                                        R$ {product.price.toFixed(2).replace('.', ',')}
                                    </Text>
                                    <View className="bg-success/10 px-2 py-0.5 rounded-full">
                                        <Text className="text-success text-[10px] font-bold">
                                            {product.discount}% OFF
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-2 mb-1">
                                    <MapPin size={12} color="#94A3B8" />
                                    <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                                        {product.store} • {product.distance}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Price Detail Footer */}
                        <View className="mt-4 pt-3 border-t border-border/30 flex-row justify-between items-center">
                            <View>
                                <Text className="text-[10px] text-muted-foreground mb-1">Média na cidade</Text>
                                <Text className="text-sm font-semibold text-muted-foreground">
                                    R$ {product.averagePrice.toFixed(2).replace('.', ',')}
                                </Text>
                            </View>
                            <View className="items-end">
                                <View className="flex-row items-center gap-1">
                                    <Clock size={10} color="#94A3B8" />
                                    <Text className="text-[10px] text-muted-foreground">
                                        Preço atualizado em {formatPriceUpdateDate(product.updatedAt)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
