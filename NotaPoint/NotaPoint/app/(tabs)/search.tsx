import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Search as SearchIcon, ShoppingCart, Pill, Wine,
    Sparkles, Leaf, TrendingDown, TrendingUp,
    MapPin, Filter, X
} from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import { StatusBar } from 'expo-status-bar';

const categories = [
    { icon: Sparkles, label: "Todos" },
    { icon: ShoppingCart, label: "Mercado" },
    { icon: Pill, label: "Farmácia" },
    { icon: Wine, label: "Bebidas" },
    { icon: Leaf, label: "Hortifruti" },
];

const mockProducts = [
    { id: 1, name: "Leite Integral Piracanjuba 1L", price: 4.49, cityAverage: 6.99, store: "Atacadão", distance: "1.2km", trend: 'down', dropPercent: 36, category: "Mercado" },
    { id: 2, name: "Arroz Tio João 5kg", price: 22.90, cityAverage: 28.50, store: "Atacadão", distance: "1.2km", trend: 'down', dropPercent: 20, category: "Mercado" },
    { id: 3, name: "Café Pilão 500g", price: 12.90, cityAverage: 18.90, store: "Carrefour", distance: "2.1km", trend: 'down', dropPercent: 31, category: "Mercado" },
    { id: 4, name: "Óleo de Soja 900ml", price: 5.99, cityAverage: 8.99, store: "Extra", distance: "800m", trend: 'down', dropPercent: 33, category: "Mercado" },
    { id: 5, name: "Dorflex 36 Comprimidos", price: 18.90, cityAverage: 24.50, store: "Droga Raia", distance: "1.5km", trend: 'up', dropPercent: 22, category: "Farmácia" },
];

function CategoryPill({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
    const primaryColor = 'rgb(0, 112, 75)';
    return (
        <Pressable
            onPress={onClick}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-xl h-10 ${isActive ? "bg-primary" : "bg-muted"
                }`}
        >
            <Icon size={16} color={isActive ? "white" : primaryColor} />
            <Text className={`text-sm font-medium ${isActive ? "text-white" : "text-foreground"}`}>
                {label}
            </Text>
        </Pressable>
    );
}

function ProductCard({ name, price, cityAverage, store, distance, trend, dropPercent }: any) {
    return (
        <View className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 mb-4">
            <View className="flex-row gap-4 mb-4">
                {/* Image Placeholder */}
                <View className="w-20 h-20 rounded-xl bg-primary/5 items-center justify-center">
                    <ShoppingCart size={32} color="rgb(0, 112, 75)" opacity={0.3} />
                </View>

                {/* Product Info */}
                <View className="flex-1">
                    <Text className="font-semibold text-foreground text-base mb-1" numberOfLines={1}>{name}</Text>
                    <View className="flex-row items-end gap-2 mb-2">
                        <Text className="text-2xl font-bold text-primary">
                            R$ {price.toFixed(2).replace(".", ",")}
                        </Text>
                        <View className={`flex-row items-center px-2 py-0.5 rounded-full mb-1 ${trend === 'down' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                            {trend === 'down' ? (
                                <TrendingDown size={14} color="#10b981" />
                            ) : (
                                <TrendingUp size={14} color="#ef4444" />
                            )}
                            <Text className={`text-xs font-bold ml-1 ${trend === 'down' ? 'text-success' : 'text-destructive'}`}>
                                {dropPercent}% {trend === 'down' ? '↓' : '↑'}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <MapPin size={12} color="#737373" />
                        <Text className="text-muted-foreground text-xs" numberOfLines={1}>{store} • {distance}</Text>
                    </View>
                </View>
            </View>

            {/* City Average comparison */}
            <View className="pt-3 border-t border-border/50 flex-row justify-between items-center">
                <Text className="text-xs text-muted-foreground">Média na cidade</Text>
                <Text className="text-sm font-bold text-foreground">
                    R$ {cityAverage.toFixed(2).replace(".", ",")}
                </Text>
            </View>
            <View className="mt-2 flex-row items-center gap-1">
                <Text className="text-[10px] text-muted-foreground italic">Preço atualizado hoje às 08:30</Text>
            </View>
        </View>
    );
}

export default function Search() {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        return mockProducts.filter(product => {
            const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1 p-4">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-foreground">Buscar Produtos</Text>
                        <Text className="text-sm text-muted-foreground">Compare preços em tempo real</Text>
                    </View>
                    <Pressable className="p-2.5 rounded-xl bg-muted">
                        <Filter size={20} color="black" />
                    </Pressable>
                </View>

                {/* Search Bar */}
                <View className="relative mb-6">
                    <Input
                        placeholder="Buscar produto..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="pl-12 h-14 rounded-2xl bg-muted border-transparent"
                    />
                    <View className="absolute left-4 top-4">
                        <SearchIcon size={20} color="#737373" />
                    </View>
                    {searchQuery.length > 0 && (
                        <Pressable
                            onPress={() => setSearchQuery("")}
                            className="absolute right-4 top-4"
                        >
                            <X size={20} color="#737373" />
                        </Pressable>
                    )}
                </View>

                {/* Categories */}
                <View className="mb-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 overflow-visible">
                        <View className="flex-row gap-2 pr-8">
                            {categories.map((cat) => (
                                <CategoryPill
                                    key={cat.label}
                                    icon={cat.icon}
                                    label={cat.label}
                                    isActive={activeCategory === cat.label}
                                    onClick={() => setActiveCategory(cat.label)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Results List */}
                <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'Produto encontrado' : 'Produtos encontrados'}
                        </Text>
                    </View>

                    {filteredProducts.length > 0 ? (
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{ paddingBottom: 110 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </ScrollView>
                    ) : (
                        <View className="flex-1 items-center justify-center pt-10">
                            <View className="w-20 h-20 bg-muted rounded-full items-center justify-center mb-4">
                                <SearchIcon size={32} color="#737373" opacity={0.5} />
                            </View>
                            <Text className="text-lg font-bold text-foreground">Nenhum resultado</Text>
                            <Text className="text-sm text-muted-foreground text-center px-10">
                                Não encontramos produtos com "{searchQuery}" na categoria {activeCategory}.
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
