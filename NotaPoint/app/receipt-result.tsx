// @ts-nocheck
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { Check, MapPin, Calendar, Receipt, ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

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
        router.replace("/(tabs)");
    };

    return (
        <View className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Success Header */}
                <Animated.View
                    entering={FadeInDown.duration(600)}
                    className="rounded-b-3xl overflow-hidden"
                >
                    <LinearGradient
                        colors={['#10B981', '#059669']}
                        className="px-6 pt-16 pb-12 items-center"
                    >
                        <Animated.View
                            entering={ZoomIn.delay(200).springify()}
                            className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4"
                        >
                            <Check size={32} color="#FFFFFF" strokeWidth={3} />
                        </Animated.View>
                        <Text className="text-2xl font-bold text-white mb-2">
                            Nota registrada!
                        </Text>
                        <Text className="text-white/80 text-center">
                            Seus preços ajudam toda a comunidade
                        </Text>
                    </LinearGradient>
                </Animated.View>

                {/* Store Info */}
                <Animated.View
                    entering={FadeInUp.delay(100).duration(500)}
                    className="mx-4 -mt-6 bg-card rounded-2xl p-4 shadow-lg border border-border/50"
                >
                    <View className="flex-row items-start gap-3">
                        <View className="w-12 h-12 rounded-xl bg-secondary items-center justify-center">
                            <Receipt size={24} color="#10B981" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-semibold text-foreground text-lg">Supermercado BomPreço</Text>
                            <View className="flex-row items-center gap-1 mt-1">
                                <MapPin size={12} color="#64748B" />
                                <Text className="text-sm text-muted-foreground">Av. Brasil, 1234 - Centro</Text>
                            </View>
                            <View className="flex-row items-center gap-1 mt-1">
                                <Calendar size={12} color="#64748B" />
                                <Text className="text-sm text-muted-foreground">Hoje, 14:32</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Items List */}
                <View className="p-6">
                    <Text className="text-lg font-bold text-foreground mb-4">
                        Itens da compra ({mockItems.length})
                    </Text>

                    <View className="gap-0">
                        {mockItems.map((item, index) => (
                            <Animated.View
                                key={index}
                                entering={FadeInDown.delay(200 + index * 50).duration(400)}
                                className="flex-row items-center justify-between py-3 border-b border-border/30 last:border-0"
                            >
                                <View className="flex-1 mr-4">
                                    <Text className="font-medium text-foreground text-base" numberOfLines={1}>{item.name}</Text>
                                    <Text className="text-sm text-muted-foreground">Qtd: {item.quantity}</Text>
                                </View>
                                <Text className="font-semibold text-foreground text-base">
                                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                </Text>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Total */}
                    <Animated.View
                        entering={FadeInUp.delay(500).duration(500)}
                        className="mt-6 pt-4 border-t-2 border-primary/20 flex-row justify-between items-center"
                    >
                        <Text className="text-lg font-bold text-foreground">Total</Text>
                        <Text className="text-3xl font-bold text-primary">
                            R$ {total.toFixed(2).replace(".", ",")}
                        </Text>
                    </Animated.View>
                </View>
            </ScrollView>

            {/* Footer Action */}
            <Animated.View
                entering={FadeInUp.delay(600).duration(500)}
                className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border/30"
            >
                <SafeAreaView edges={['bottom']}>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        className="w-full h-14 bg-primary rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary/20"
                        activeOpacity={0.9}
                    >
                        <Text className="text-primary-foreground text-lg font-bold mr-2">
                            Confirmar e salvar
                        </Text>
                        <ChevronRight size={20} color="#FFFFFF" strokeWidth={3} />
                    </TouchableOpacity>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
}
