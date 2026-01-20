// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
    ChefHat, Heart, Clock, Users, Flame, Star,
    TrendingUp, Sparkles, BookOpen, Search, ChevronRight, ShoppingBag
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs } from '@/components/ui/tabs-custom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';

// Mock Data
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
    }
];

const categories = ["Todas", "Café da Manhã", "Almoço", "Jantar", "Sobremesa", "Lanche"];

export default function Recipes() {
    const router = useRouter();
    const [recipes, setRecipes] = useState(mockRecipes);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [activeTab, setActiveTab] = useState("recomendadas");

    const toggleFavorite = (id: number) => {
        setRecipes(recipes.map(r =>
            r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
        ));
    };

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getRecipesByTab = () => {
        // Simplified logic for prototype
        if (activeTab === 'favoritas') return filteredRecipes.filter(r => r.isFavorite);
        return filteredRecipes;
    };

    const displayRecipes = getRecipesByTab();

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="px-4 pt-4 pb-2">
                    <Animated.View entering={FadeInDown.duration(400)} className="flex-row justify-between items-center mb-4">
                        <View>
                            <Text className="text-2xl font-bold text-foreground">Receitas</Text>
                            <Text className="text-sm text-muted-foreground">Baseadas nas suas compras</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center"
                        >
                            <ChefHat size={24} color="#10B981" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Search */}
                    <View className="relative mb-4">
                        <View className="absolute left-3 top-3 z-10">
                            <Search size={16} color="#94A3B8" />
                        </View>
                        <TextInput
                            placeholder="Buscar receitas..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            className="pl-10 h-12 bg-muted/50 border border-border/50 rounded-xl"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>

                    {/* Categories */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 pb-2">
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                onPress={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full border mr-2",
                                    selectedCategory === category ? "bg-primary border-primary" : "bg-transparent border-border"
                                )}
                            >
                                <Text className={cn("text-sm font-medium", selectedCategory === category ? "text-primary-foreground" : "text-muted-foreground")}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Tabs */}
                <View className="px-4">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        options={[
                            { label: "Para você", value: "recomendadas", icon: Sparkles },
                            { label: "Favoritas", value: "favoritas", icon: Heart },
                            { label: "Popular", value: "trending", icon: TrendingUp },
                        ]}
                    />
                </View>

                {/* Content */}
                <View className="px-4 py-2 gap-4">
                    {activeTab === "recomendadas" && (
                        <LinearGradient
                            colors={['rgba(16, 185, 129, 0.1)', 'rgba(125, 211, 252, 0.1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="rounded-2xl p-4 border border-primary/20 flex-row items-center gap-3"
                        >
                            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                                <ShoppingBag size={20} color="#10B981" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-medium text-foreground">{displayRecipes.length} receitas disponíveis</Text>
                                <Text className="text-xs text-muted-foreground">Com base nos itens das suas compras</Text>
                            </View>
                            <ChevronRight size={20} color="#94A3B8" />
                        </LinearGradient>
                    )}

                    <View className="flex-row flex-wrap justify-between">
                        {displayRecipes.map((recipe, index) => (
                            <Animated.View
                                key={recipe.id}
                                entering={FadeInUp.delay(index * 100).duration(500)}
                                className="w-[48%] bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm mb-4"
                            >
                                <View className="relative">
                                    <Image
                                        source={{ uri: recipe.image }}
                                        className="w-full h-36 bg-gray-200"
                                    />
                                    <View className="absolute top-2 left-2">
                                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                                            <Sparkles size={10} color="#10B981" className="mr-1" />
                                            <Text className="text-[10px] font-medium text-foreground">{recipe.matchPercentage}%</Text>
                                        </Badge>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => toggleFavorite(recipe.id)}
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 items-center justify-center"
                                    >
                                        <Heart size={14} color={recipe.isFavorite ? "#EF4444" : "#64748B"} fill={recipe.isFavorite ? "#EF4444" : "transparent"} />
                                    </TouchableOpacity>
                                </View>

                                <View className="p-3 gap-2">
                                    <Text className="font-semibold text-foreground text-sm line-clamp-1" numberOfLines={1}>{recipe.name}</Text>

                                    <View className="flex-row items-center gap-2">
                                        <View className="flex-row items-center gap-0.5">
                                            <Clock size={10} color="#64748B" />
                                            <Text className="text-[10px] text-muted-foreground">{recipe.time}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-0.5">
                                            <Flame size={10} color="#64748B" />
                                            <Text className="text-[10px] text-muted-foreground">{recipe.calories}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center justify-between mt-1">
                                        <View className="flex-row items-center gap-1">
                                            <Star size={10} color="#FBBF24" fill="#FBBF24" />
                                            <Text className="text-[10px] font-medium text-foreground">{recipe.rating}</Text>
                                        </View>
                                        <Badge variant="outline" className="px-1.5 py-0 border-border/50">
                                            <Text className="text-[10px] text-muted-foreground">{recipe.difficulty}</Text>
                                        </Badge>
                                    </View>
                                </View>
                            </Animated.View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
