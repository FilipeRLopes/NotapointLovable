// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import Animated, { FadeInDown, FadeInRight, Layout } from 'react-native-reanimated';
import { Plus, Trash2, MapPin, ShoppingCart, Clock, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPriceUpdateDate } from '@/lib/format-date';

interface ListItem {
    id: number;
    name: string;
    bestPrice: number;
    bestStore: string;
    checked: boolean;
    updatedAt?: Date;
}

const initialItems: ListItem[] = [
    { id: 1, name: "Arroz 5kg", bestPrice: 22.90, bestStore: "Atacadão", checked: false, updatedAt: new Date(Date.now() - 3600000) },
    { id: 2, name: "Feijão 1kg", bestPrice: 6.99, bestStore: "BomPreço", checked: false, updatedAt: new Date(Date.now() - 7200000) },
    { id: 3, name: "Óleo 900ml", bestPrice: 5.99, bestStore: "Extra", checked: true, updatedAt: new Date(Date.now() - 1800000) },
];

export default function ListScreen() {
    const [items, setItems] = useState<ListItem[]>(initialItems);
    const [newItem, setNewItem] = useState("");

    const addItem = () => {
        if (!newItem.trim()) return;
        setItems([
            ...items,
            { id: Date.now(), name: newItem, bestPrice: 0, bestStore: "Buscando...", checked: false }
        ]);
        setNewItem("");
    };

    const toggleItem = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const total = items.reduce((sum, item) => sum + item.bestPrice, 0);
    const checkedCount = items.filter(i => i.checked).length;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                    {/* Header */}
                    <Animated.View
                        entering={FadeInDown.duration(400)}
                        className="mb-6"
                    >
                        <Text className="text-2xl font-bold text-foreground mb-1">Lista de Compras</Text>
                        <Text className="text-muted-foreground">
                            {checkedCount}/{items.length} itens • Estimado: R$ {total.toFixed(2).replace(".", ",")}
                        </Text>
                    </Animated.View>

                    {/* Add Item */}
                    <Animated.View
                        entering={FadeInDown.delay(100).duration(400)}
                        className="flex-row gap-2 mb-6"
                    >
                        <TextInput
                            value={newItem}
                            onChangeText={setNewItem}
                            onSubmitEditing={addItem}
                            placeholder="Adicionar item..."
                            placeholderTextColor="#94A3B8"
                            className="flex-1 h-12 rounded-xl bg-card border border-border/50 px-4 text-foreground"
                        />
                        <TouchableOpacity
                            onPress={addItem}
                            className="h-12 w-12 rounded-xl bg-primary items-center justify-center shadow-sm"
                            activeOpacity={0.8}
                        >
                            <Plus size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Items List */}
                    <View className="gap-3 mb-6">
                        {items.map((item, index) => (
                            <Animated.View
                                key={item.id}
                                entering={FadeInRight.delay(100 + index * 50).duration(400)}
                                layout={Layout.springify()}
                                className={`bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex-row items-start gap-3 ${item.checked ? "opacity-60" : ""
                                    }`}
                            >
                                <TouchableOpacity
                                    onPress={() => toggleItem(item.id)}
                                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mt-0.5 ${item.checked ? "bg-primary border-primary" : "border-border"
                                        }`}
                                >
                                    {item.checked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                                </TouchableOpacity>

                                <View className="flex-1">
                                    <Text className={`font-medium text-foreground ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                                        {item.name}
                                    </Text>

                                    {item.bestPrice > 0 && (
                                        <View className="mt-1 gap-1">
                                            <View className="flex-row items-center gap-2">
                                                <Text className="text-sm font-semibold text-primary">
                                                    R$ {item.bestPrice.toFixed(2).replace(".", ",")}
                                                </Text>
                                                <View className="flex-row items-center gap-1">
                                                    <MapPin size={12} color="#94A3B8" />
                                                    <Text className="text-xs text-muted-foreground">{item.bestStore}</Text>
                                                </View>
                                            </View>

                                            {item.updatedAt && (
                                                <View className="flex-row items-center gap-1">
                                                    <Clock size={10} color="#94A3B8" />
                                                    <Text className="text-[10px] text-muted-foreground">
                                                        Preço atualizado em {formatPriceUpdateDate(item.updatedAt)}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>

                                <TouchableOpacity
                                    onPress={() => removeItem(item.id)}
                                    className="p-1"
                                >
                                    <Trash2 size={20} color="#94A3B8" />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Smart Cart Button - Placeholder action for now */}
                    <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                        <TouchableOpacity
                            className="w-full h-14 rounded-2xl bg-accent flex-row items-center justify-center gap-2 shadow-sm"
                            onPress={() => Alert.alert("Em desenvolvimento", "A funcionalidade de otimização de rota será implementada em breve.")}
                        >
                            <ShoppingCart size={20} color="#451a03" />
                            <Text className="text-accent-foreground font-semibold text-lg">Onde comprar mais barato</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
