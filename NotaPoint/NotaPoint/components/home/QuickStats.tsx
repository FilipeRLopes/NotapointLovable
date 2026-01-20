import React from 'react';
import { View, Text } from 'react-native';
import { TrendingDown, Receipt, Coins } from 'lucide-react-native';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    subtext?: string;
    primary?: boolean;
}

function StatCard({ icon, label, value, subtext, primary }: StatCardProps) {
    return (
        <View className={`bg-card rounded-2xl p-4 shadow-sm border border-border/50 ${primary ? "bg-primary/5 border-primary/10" : ""}`}>
            <View className="flex-row items-center gap-2 mb-2">
                <View className={`w-8 h-8 rounded-lg items-center justify-center ${primary ? "bg-primary/20" : "bg-muted"}`}>
                    {icon}
                </View>
                <Text className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">{label}</Text>
            </View>
            <Text className={`text-xl font-bold ${primary ? "text-primary" : "text-foreground"}`}>{value}</Text>
            {subtext && (
                <Text className="text-[10px] text-muted-foreground mt-1 font-medium">{subtext}</Text>
            )}
        </View>
    );
}

export function QuickStats() {
    return (
        <View className="gap-3">
            <View className="flex-row gap-3">
                <View className="flex-1">
                    <StatCard
                        icon={<Coins size={16} color="hsl(160, 100%, 22%)" />}
                        label="Economia do mês"
                        value="R$ 127,40"
                        subtext="vs. preço médio"
                        primary
                    />
                </View>
                <View className="flex-1">
                    <StatCard
                        icon={<Receipt size={16} color="hsl(160, 100%, 22%)" />}
                        label="Notas enviadas"
                        value="23"
                        subtext="este mês"
                    />
                </View>
            </View>
            <View className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-xl bg-success/10 items-center justify-center">
                            <TrendingDown size={20} color="#10b981" />
                        </View>
                        <View>
                            <Text className="text-xs font-bold text-foreground">Melhor economia recente</Text>
                            <Text className="text-[10px] text-muted-foreground">Arroz 5kg - R$ 8,50 mais barato</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className="text-[10px] text-success font-bold">-24%</Text>
                        <Text className="text-[10px] text-muted-foreground">Hoje</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
