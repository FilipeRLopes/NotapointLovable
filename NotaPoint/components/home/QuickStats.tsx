// @ts-nocheck
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// @ts-ignore
import { TrendingDown, Receipt, Coins } from 'lucide-react-native';
// Note: Card component not strictly needed if we just style the View, but good for consistency.
// We'll style directly for now to match the "grid" layout specificity.

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    subtext?: string;
    delay?: number;
    className?: string;
}

function StatCard({ icon, label, value, subtext, delay = 0, className }: StatCardProps) {
    return (
        <Animated.View
            entering={FadeInUp.delay(delay * 100).duration(300)}
            className={`bg-white rounded-[24px] p-4 shadow-sm border border-[#E0E0E0]/50 ${className}`}
        >
            <View className="flex-row items-center gap-3 mb-2">
                <View className="w-10 h-10 rounded-full bg-[#00704B1A] items-center justify-center">
                    <View>
                        {icon}
                    </View>
                </View>
                <Text className="text-muted-foreground text-sm flex-1" numberOfLines={1}>{label}</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">{value}</Text>
            {subtext && <Text className="text-xs text-muted-foreground mt-1">{subtext}</Text>}
        </Animated.View>
    );
}

export function QuickStats() {
    return (
        <View className="flex-col gap-3">
            <View className="flex-row gap-3">
                <View className="flex-1">
                    <StatCard
                        icon={<Coins size={20} color="#00704B" />} // Primary color
                        label="Economia do mês"
                        value="R$ 127,40"
                        subtext="vs. preço médio"
                        delay={0}
                    />
                </View>
                <View className="flex-1">
                    <StatCard
                        icon={<Receipt size={20} color="#00704B" />}
                        label="Notas escaneadas"
                        value="23"
                        subtext="este mês"
                        delay={1}
                    />
                </View>
            </View>
            <View>
                <StatCard
                    icon={<TrendingDown size={20} color="#00704B" />}
                    label="Melhor economia recente"
                    value="Arroz 5kg - R$ 8,50 mais barato"
                    subtext="Supermercado BomPreço • Hoje"
                    delay={2}
                />
            </View>
        </View>
    );
}
