import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    ChefHat, Heart, Clock, Users, Flame, Star,
    TrendingUp, Sparkles, BookOpen, Search, ChevronRight,
    ShoppingBag, ArrowLeft
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';

const mockRecipes = [
    {
        id: 1,
        name: "Arroz com Feijão Tradicional",
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
        time: "45 min",
        servings: 4,
        difficulty: "Fácil",
        calories: 380,
        matchPercentage: 100,
        ingredients: ["Arroz", "Feijão", "Alho", "Cebola", "Sal"],
        missingIngredients: [],
        isFavorite: true,
        timesMade: 12,
        rating: 4.8,
        category: "Almoço"
    },
    {
        id: 2,
        name: "Frango Grelhado com Legumes",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
        time: "35 min",
        servings: 2,
        difficulty: "Fácil",
        calories: 420,
        matchPercentage: 85,
        ingredients: ["Peito de Frango", "Abobrinha", "Cenoura", "Alho"],
        missingIngredients: ["Abobrinha"],
        isFavorite: false,
        timesMade: 5,
        rating: 4.5,
        category: "Almoço"
    },
];

const categories = ["Todas", "Café da Manhã", "Almoço", "Jantar", "Sobremesa", "Lanche"];

export default function Recipes() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('recomendadas');
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1 px-4">
                {/* Header */}
                <View className="flex-row items-center justify-between mt-4 mb-6">
                    <View className="flex-row items-center gap-4">
                        <Pressable onPress={() => router.back()} className="p-2 rounded-xl bg-muted">
                            <ArrowLeft size={20} color="black" />
                        </Pressable>
                        <View>
                            <Text className="text-xl font-bold text-foreground">Receitas</Text>
                            <Text className="text-sm text-muted-foreground">Baseadas nas suas compras</Text>
                        </View>
                    </View>
                    <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                        <ChefHat size={24} color="hsl(160, 100%, 22%)" />
                    </View>
                </View>

                {/* Search */}
                <View className="relative mb-4">
                    <View className="absolute left-4 top-[14px] z-10">
                        <Search size={18} color="#9ca3af" />
                    </View>
                    <TextInput
                        placeholder="Buscar receitas..."
                        className="bg-muted/50 border border-border/50 h-12 rounded-xl pl-12 pr-4 text-foreground font-medium"
                    />
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-4 px-4 overflow-visible h-10 min-h-[40px]">
                    <View className="flex-row gap-2">
                        {categories.map((cat) => (
                            <Pressable
                                key={cat}
                                onPress={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? "bg-primary border-primary" : "bg-card border-border/50"}`}
                            >
                                <Text className={`text-xs font-bold ${selectedCategory === cat ? "text-white" : "text-muted-foreground"}`}>{cat}</Text>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>

                {/* Tabs */}
                <View className="flex-row bg-muted rounded-xl p-1 mb-6">
                    {['recomendadas', 'favoritas', 'mais-feitas'].map((tab) => (
                        <Pressable
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`flex-1 py-1.5 rounded-lg items-center ${activeTab === tab ? "bg-card shadow-sm" : ""}`}
                        >
                            <Text className={`text-[10px] font-bold ${activeTab === tab ? "text-foreground" : "text-muted-foreground"}`}>
                                {tab === 'recomendadas' ? 'Para você' : tab === 'favoritas' ? 'Favoritas' : 'Mais feitas'}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Recommendation Banner */}
                    {activeTab === 'recomendadas' && (
                        <View className="bg-primary/5 rounded-2xl p-4 mb-6 flex-row items-center gap-3 border border-primary/10">
                            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                                <ShoppingBag size={20} color="hsl(160, 100%, 22%)" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-foreground">12 receitas disponíveis</Text>
                                <Text className="text-[10px] text-muted-foreground">Com base nos itens das suas compras</Text>
                            </View>
                            <ChevronRight size={16} color="#9ca3af" />
                        </View>
                    )}

                    {/* Recipe Grid */}
                    <View className="flex-row flex-wrap gap-4">
                        {mockRecipes.map((recipe) => (
                            <View key={recipe.id} className="w-[47%] bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                                <View className="relative">
                                    <Image source={{ uri: recipe.image }} className="w-full h-32" />
                                    <View className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-full flex-row items-center gap-1">
                                        <Sparkles size={8} color="#10b981" />
                                        <Text className="text-[8px] font-bold text-foreground">{recipe.matchPercentage}% match</Text>
                                    </View>
                                    <Pressable className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full items-center justify-center">
                                        <Heart size={14} color={recipe.isFavorite ? "#ef4444" : "#9ca3af"} fill={recipe.isFavorite ? "#ef4444" : "transparent"} />
                                    </Pressable>
                                </View>
                                <View className="p-3">
                                    <Text className="font-bold text-foreground text-sm line-clamp-1 h-5" numberOfLines={1}>{recipe.name}</Text>
                                    <View className="flex-row items-center gap-2 mt-1 mb-2">
                                        <View className="flex-row items-center gap-1">
                                            <Clock size={10} color="#9ca3af" />
                                            <Text className="text-[8px] text-muted-foreground">{recipe.time}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-1">
                                            <Flame size={10} color="#9ca3af" />
                                            <Text className="text-[8px] text-muted-foreground">{recipe.calories} kcal</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center justify-between pt-1 border-t border-border/20">
                                        <View className="flex-row items-center gap-1">
                                            <Star size={10} color="#f59e0b" fill="#f59e0b" />
                                            <Text className="text-[10px] font-bold text-foreground">{recipe.rating}</Text>
                                        </View>
                                        <Text className="text-[8px] text-muted-foreground font-bold uppercase">{recipe.difficulty}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View className="h-20" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
