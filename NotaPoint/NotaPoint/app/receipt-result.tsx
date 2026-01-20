import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Check, MapPin, Calendar, ChevronRight, Receipt } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';

const mockItems = [
    { name: "Arroz Tio João 5kg", quantity: 1, price: 24.90 },
    { name: "Feijão Carioca 1kg", quantity: 2, price: 7.49 },
    { name: "Óleo de Soja Liza 900ml", quantity: 1, price: 5.99 },
    { name: "Açúcar União 1kg", quantity: 1, price: 4.79 },
    { name: "Café Pilão 500g", quantity: 1, price: 14.90 },
    { name: "Leite Integral Italac 1L", quantity: 3, price: 4.99 },
];

export default function ReceiptResult() {
    const router = useRouter();
    const total = mockItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleConfirm = () => {
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="light" />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Success Header */}
                <View className="gradient-primary px-6 pt-16 pb-12 rounded-b-[40px] items-center text-center shadow-lg">
                    <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                        <Check size={40} color="white" strokeWidth={3} />
                    </View>
                    <Text className="text-3xl font-black text-white mb-2 tracking-tight">Nota registrada!</Text>
                    <Text className="text-white/80 text-center px-4 font-medium">
                        Seus preços ajudam toda a comunidade a economizar
                    </Text>
                </View>

                {/* Store Info */}
                <View className="mx-6 -mt-8 bg-card rounded-3xl p-5 shadow-xl border border-border/20">
                    <View className="flex-row items-center gap-4">
                        <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
                            <Receipt size={28} color="hsl(160, 100%, 22%)" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-black text-foreground text-lg tracking-tight">Supermercado BomPreço</Text>
                            <View className="flex-row items-center gap-1.5 mt-1">
                                <MapPin size={12} color="#9ca3af" />
                                <Text className="text-muted-foreground text-xs font-medium">Av. Brasil, 1234 - Centro</Text>
                            </View>
                            <View className="flex-row items-center gap-1.5 mt-1">
                                <Calendar size={12} color="#9ca3af" />
                                <Text className="text-muted-foreground text-xs font-medium">Hoje, 14:32</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Items List */}
                <View className="p-6">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-xl font-black text-foreground tracking-tight">
                            Itens da compra
                        </Text>
                        <View className="bg-muted px-3 py-1 rounded-full">
                            <Text className="text-xs font-black text-muted-foreground">{mockItems.length} ITENS</Text>
                        </View>
                    </View>

                    <View className="gap-1">
                        {mockItems.map((item, index) => (
                            <View
                                key={index}
                                className="flex-row items-center justify-between py-4 border-b border-border/30 last:border-0"
                            >
                                <View className="flex-1">
                                    <Text className="font-bold text-foreground text-base leading-tight">{item.name}</Text>
                                    <Text className="text-xs text-muted-foreground font-medium mt-0.5">Qtd: {item.quantity} • Unit: R$ {item.price.toFixed(2).replace(".", ",")}</Text>
                                </View>
                                <Text className="font-black text-foreground text-base ml-4">
                                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Total */}
                    <View className="mt-6 pt-6 border-t-2 border-primary/20 flex-row justify-between items-center">
                        <Text className="text-xl font-black text-foreground tracking-tight">Total</Text>
                        <Text className="text-3xl font-black text-primary tracking-tighter">
                            R$ {total.toFixed(2).replace(".", ",")}
                        </Text>
                    </View>
                </View>

                {/* Actions */}
                <View className="p-6 pb-12">
                    <Button
                        variant="gradient"
                        onPress={handleConfirm}
                        className="w-full h-16 rounded-3xl shadow-glow"
                    >
                        <View className="flex-row items-center gap-3">
                            <Text className="text-white text-lg font-black tracking-tight">Confirmar e salvar</Text>
                            <ChevronRight size={24} color="white" />
                        </View>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
