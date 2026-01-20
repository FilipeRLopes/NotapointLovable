import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ShoppingCart, Plus, MapPin, TrendingDown, ChevronRight, X, Info, Sparkles, Navigation, Clock, Trash2, CheckCircle2, Circle } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

interface ListItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    checked: boolean;
    store: string;
    updatedAt: string;
}

const listItems: ListItem[] = [
    { id: 1, name: "Leite Integral Piracanjuba 1L", price: 4.49, quantity: 2, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop", checked: true, store: "Atacadão", updatedAt: "Hoje às 08:32" },
    { id: 2, name: "Pão de Forma Wickbold 500g", price: 8.90, quantity: 1, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop", checked: false, store: "Carrefour", updatedAt: "Ontem às 18:15" },
    { id: 3, name: "Café Pilão 500g", price: 12.90, quantity: 1, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop", checked: false, store: "Sonda", updatedAt: "Hoje às 07:10" },
];

const storesComparison = [
    { name: "Atacadão", total: 30.78, distance: "1.2km", items: 3 },
    { name: "Carrefour", total: 32.50, distance: "2.1km", items: 3 },
    { name: "Sonda", total: 35.88, distance: "1.5km", items: 3 },
];

export default function ShoppingList() {
    const [items, setItems] = useState<ListItem[]>(listItems);
    const [showSmartCart, setShowSmartCart] = useState(false);
    const [smartCartTab, setSmartCartTab] = useState<'single' | 'combo'>('single');
    const [newItem, setNewItem] = useState("");

    const estimatedTotal = items.reduce((acc: number, item: ListItem) => acc + (item.price * item.quantity), 0);
    const checkedCount = items.filter((i: ListItem) => i.checked).length;

    const toggleItem = (id: number) => {
        setItems(items.map((i: ListItem) => i.id === id ? { ...i, checked: !i.checked } : i));
    };

    const deleteItem = (id: number) => {
        setItems(items.filter((i: ListItem) => i.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1">
                {/* Header Section */}
                <View className="px-6 py-4 items-center">
                    <Text className="text-xl font-bold text-foreground mb-1">Lista de Compras</Text>
                    <Text className="text-sm text-muted-foreground font-medium">
                        {checkedCount}/{items.length} itens • Estimado: R$ {estimatedTotal.toFixed(2).replace(".", ",")}
                    </Text>
                </View>

                {/* Search Bar / Add Item */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center bg-muted rounded-2xl px-4 py-1">
                        <TextInput
                            placeholder="Adicionar item..."
                            className="flex-1 h-12 text-foreground font-medium"
                            value={newItem}
                            onChangeText={setNewItem}
                        />
                        <Pressable className="bg-primary w-8 h-8 rounded-full items-center justify-center">
                            <Plus size={20} color="white" />
                        </Pressable>
                    </View>
                </View>

                {/* Items List */}
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 24 }}>
                    {items.map((item: ListItem) => (
                        <View key={item.id} className="bg-card rounded-2xl p-4 border border-border/50 mb-3 relative">
                            <View className="flex-row items-start gap-4">
                                {/* Checkbox */}
                                <Pressable onPress={() => toggleItem(item.id)} className="mt-1">
                                    {item.checked ? (
                                        <CheckCircle2 size={24} color="rgb(0, 112, 75)" fill="rgba(0, 112, 75, 0.1)" />
                                    ) : (
                                        <Circle size={24} color="#d1d5db" />
                                    )}
                                </Pressable>

                                <View className="flex-1">
                                    <View className="flex-row justify-between items-start">
                                        <Text className={`font-bold text-foreground text-base mb-1 ${item.checked ? 'line-through opacity-50' : ''}`} numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Pressable onPress={() => deleteItem(item.id)} className="p-1 -mt-1">
                                            <Trash2 size={16} color="#ef4444" opacity={0.6} />
                                        </Pressable>
                                    </View>

                                    <Text className="text-primary font-black text-lg">
                                        R$ {item.price.toFixed(2).replace(".", ",")}
                                    </Text>

                                    <View className="flex-row items-center gap-4 mt-2">
                                        <View className="flex-row items-center gap-1">
                                            <MapPin size={12} color="#737373" />
                                            <Text className="text-[10px] text-muted-foreground font-medium">{item.store}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-1">
                                            <Clock size={12} color="#737373" />
                                            <Text className="text-[10px] text-muted-foreground font-medium">Preço atualizado em {item.updatedAt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Smart Cart Toggle */}
                    <Pressable
                        onPress={() => setShowSmartCart(true)}
                        className="mt-4 bg-accent/20 border border-accent/30 h-16 rounded-2xl items-center justify-center flex-row gap-3 shadow-sm"
                    >
                        <MapPin size={24} color="rgb(245, 158, 11)" />
                        <Text className="text-lg font-bold text-foreground">Onde comprar mais barato?</Text>
                    </Pressable>
                </ScrollView>

                {/* Smart Cart Modal */}
                <Modal
                    visible={showSmartCart}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowSmartCart(false)}
                >
                    <View className="flex-1 bg-black/60 justify-end">
                        <View className="bg-background rounded-t-[40px] h-[85%] p-6">
                            {/* Modal Header */}
                            <View className="flex-row justify-between items-center mb-6">
                                <View>
                                    <Text className="text-2xl font-bold text-foreground">Smart Cart</Text>
                                    <Text className="text-sm text-muted-foreground">Melhores opções para sua lista</Text>
                                </View>
                                <Pressable
                                    onPress={() => setShowSmartCart(false)}
                                    className="p-2 rounded-full bg-muted"
                                >
                                    <X size={24} color="black" />
                                </Pressable>
                            </View>

                            {/* Tabs */}
                            <View className="flex-row bg-muted p-1 rounded-2xl mb-6">
                                <Pressable
                                    onPress={() => setSmartCartTab('single')}
                                    className={`flex-1 py-3 rounded-xl items-center ${smartCartTab === 'single' ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <Text className={`font-bold text-sm ${smartCartTab === 'single' ? 'text-primary' : 'text-muted-foreground'}`}>Um só lugar</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setSmartCartTab('combo')}
                                    className={`flex-1 py-3 rounded-xl items-center flex-row justify-center gap-2 ${smartCartTab === 'combo' ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <Sparkles size={14} color={smartCartTab === 'combo' ? 'rgb(245, 158, 11)' : '#737373'} />
                                    <Text className={`font-bold text-sm ${smartCartTab === 'combo' ? 'text-primary' : 'text-muted-foreground'}`}>Combo inteligente</Text>
                                </Pressable>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {smartCartTab === 'single' ? (
                                    <View className="gap-3">
                                        <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-1">Rank de Lojas</Text>
                                        {storesComparison.map((store, idx) => (
                                            <View key={idx} className="bg-card border border-border/50 rounded-2xl p-4 flex-row justify-between items-center">
                                                <View>
                                                    <View className="flex-row items-center gap-2 mb-1">
                                                        <Text className="font-bold text-foreground text-base">{store.name}</Text>
                                                        {idx === 0 && (
                                                            <View className="bg-success/10 px-2 py-0.5 rounded-full">
                                                                <Text className="text-success text-[10px] font-black italic">MAIS BARATO</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <Text className="text-xs text-muted-foreground">{store.items} de {items.length} itens encontrados • {store.distance}</Text>
                                                </View>
                                                <Text className="text-lg font-bold text-primary">R$ {store.total.toFixed(2).replace(".", ",")}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <View>
                                        <LinearGradient
                                            colors={['rgba(245, 158, 11, 0.1)', 'transparent']}
                                            className="p-5 rounded-2xl border border-accent/20 mb-6"
                                        >
                                            <View className="flex-row items-center gap-2 mb-2">
                                                <Sparkles size={18} color="rgb(245, 158, 11)" />
                                                <Text className="text-lg font-bold text-foreground">Economia recorde!</Text>
                                            </View>
                                            <Text className="text-sm text-muted-foreground mb-4">Dividindo suas compras em 2 lojas, você economiza R$ 5,10 adicionais.</Text>
                                            <Button variant="outline" className="h-12 border-accent text-accent">
                                                <View className="flex-row items-center gap-2">
                                                    <Navigation size={18} color="rgb(245, 158, 11)" />
                                                    <Text className="font-bold text-accent">Ver rota otimizada</Text>
                                                </View>
                                            </Button>
                                        </LinearGradient>

                                        <View className="gap-3">
                                            <View className="bg-card border border-border/50 rounded-2xl p-4">
                                                <View className="flex-row justify-between items-center mb-3">
                                                    <Text className="font-bold text-foreground">Loja A: Atacadão</Text>
                                                    <Text className="text-primary font-bold">R$ 13,39</Text>
                                                </View>
                                                <View className="gap-2 opacity-60">
                                                    <Text className="text-xs">• Leite Integral (x2)</Text>
                                                    <Text className="text-xs">• Café Pilão (x1)</Text>
                                                </View>
                                            </View>
                                            <View className="bg-card border border-border/50 rounded-2xl p-4">
                                                <View className="flex-row justify-between items-center mb-3">
                                                    <Text className="font-bold text-foreground">Loja B: Extra</Text>
                                                    <Text className="text-primary font-bold">R$ 12,29</Text>
                                                </View>
                                                <View className="gap-2 opacity-60">
                                                    <Text className="text-xs">• Pão de Forma (x1)</Text>
                                                    <Text className="text-xs">• Óleo de Soja (x1)</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
