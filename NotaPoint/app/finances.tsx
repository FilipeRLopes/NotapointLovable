// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
    ArrowLeft, Calendar, DollarSign, TrendingUp, TrendingDown,
    LineChart as LineChartIcon, BarChart3, Receipt,
    ShoppingBag, Pill, Fuel, Zap, ChevronDown, ChevronUp, Percent
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Select } from '@/components/ui/select';
import { Tabs } from '@/components/ui/tabs-custom';
import { InflationCharts } from '@/components/finances/InflationCharts';
import { cn } from '@/lib/utils';

interface CategorySpending {
    id: string;
    name: string;
    icon: any;
    total: number;
    previousTotal: number;
    taxes: {
        icms: number;
        iss: number;
        pis: number;
        cofins: number;
    };
    items: {
        name: string;
        price: number;
        quantity: number;
    }[];
}

const mockCategories: CategorySpending[] = [
    {
        id: "1",
        name: "Supermercado",
        icon: ShoppingBag,
        total: 1245.80,
        previousTotal: 1089.50,
        taxes: { icms: 224.24, iss: 0, pis: 20.56, cofins: 94.68 },
        items: [
            { name: "Arroz 5kg", price: 28.90, quantity: 3 },
            { name: "Feijão 1kg", price: 9.50, quantity: 4 },
            { name: "Óleo de Soja 900ml", price: 8.90, quantity: 2 },
        ]
    },
    {
        id: "2",
        name: "Farmácia",
        icon: Pill,
        total: 287.45,
        previousTotal: 245.30,
        taxes: { icms: 48.87, iss: 0, pis: 4.74, cofins: 21.85 },
        items: [
            { name: "Dipirona", price: 12.90, quantity: 2 },
        ]
    },
    {
        id: "3",
        name: "Combustível",
        icon: Fuel,
        total: 580.00,
        previousTotal: 520.00,
        taxes: { icms: 156.60, iss: 0, pis: 9.57, cofins: 44.08 },
        items: [
            { name: "Gasolina", price: 5.80, quantity: 100 },
        ]
    },
    {
        id: "4",
        name: "Energia",
        icon: Zap,
        total: 245.67,
        previousTotal: 198.45,
        taxes: { icms: 61.42, iss: 0, pis: 4.05, cofins: 18.67 },
        items: [
            { name: "Conta de Luz", price: 245.67, quantity: 1 },
        ]
    },
];

const periods = [
    { value: "7", label: "Últimos 7 dias" },
    { value: "30", label: "Últimos 30 dias" },
    { value: "90", label: "Últimos 3 meses" },
    { value: "180", label: "Últimos 6 meses" },
    { value: "365", label: "Último ano" },
];

export default function Finances() {
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState("30");
    const [activeTab, setActiveTab] = useState("inflation");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const totalSpent = mockCategories.reduce((acc, cat) => acc + cat.total, 0);
    const previousTotal = mockCategories.reduce((acc, cat) => acc + cat.previousTotal, 0);
    const totalInflation = ((totalSpent - previousTotal) / previousTotal) * 100;

    const totalTaxes = mockCategories.reduce((acc, cat) => ({
        icms: acc.icms + cat.taxes.icms,
        iss: acc.iss + cat.taxes.iss,
        pis: acc.pis + cat.taxes.pis,
        cofins: acc.cofins + cat.taxes.cofins,
    }), { icms: 0, iss: 0, pis: 0, cofins: 0 });

    const totalTaxAmount = totalTaxes.icms + totalTaxes.iss + totalTaxes.pis + totalTaxes.cofins;
    const taxPercentage = (totalTaxAmount / totalSpent) * 100;

    const toggleCategory = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                {/* Header */}
                <Animated.View
                    entering={FadeInDown.duration(500)}
                    className="mb-6"
                >
                    <View className="flex-row items-center gap-4 mb-4">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="p-2 rounded-xl bg-secondary"
                        >
                            <ArrowLeft size={24} color="#000000" />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-2xl font-bold text-foreground">Finanças Pessoais</Text>
                            <Text className="text-muted-foreground text-sm">Acompanhe seus gastos e inflação</Text>
                        </View>
                    </View>

                    <Select
                        value={selectedPeriod}
                        onValueChange={setSelectedPeriod}
                        options={periods}
                    />
                </Animated.View>

                {/* Summary Cards */}
                <View className="flex-row gap-3 mb-6">
                    <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50">
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
                                <DollarSign size={16} color="#10B981" />
                            </View>
                            <Text className="text-xs text-muted-foreground">Total Gasto</Text>
                        </View>
                        <Text className="text-xl font-bold text-foreground">R$ {totalSpent.toFixed(2)}</Text>
                    </View>

                    <View className={cn("flex-1 bg-card rounded-2xl p-4 border", totalInflation > 0 ? "border-destructive/30" : "border-primary/30")}>
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className={cn("w-8 h-8 rounded-lg items-center justify-center", totalInflation > 0 ? "bg-destructive/10" : "bg-primary/10")}>
                                {totalInflation > 0 ? (
                                    <TrendingUp size={16} color="#EF4444" />
                                ) : (
                                    <TrendingDown size={16} color="#10B981" />
                                )}
                            </View>
                            <Text className="text-xs text-muted-foreground">Inflação Pessoal</Text>
                        </View>
                        <Text className={cn("text-xl font-bold", totalInflation > 0 ? "text-destructive" : "text-primary")}>
                            {totalInflation > 0 ? "+" : ""}{totalInflation.toFixed(1)}%
                        </Text>
                    </View>
                </View>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    options={[
                        { label: "Inflação", value: "inflation", icon: LineChartIcon },
                        { label: "Gastos", value: "spending", icon: BarChart3 },
                        { label: "Impostos", value: "taxes", icon: Receipt },
                    ]}
                />

                {/* Tab Content */}
                {activeTab === 'inflation' && (
                    <Animated.View entering={FadeInDown.duration(300)}>
                        <InflationCharts />
                    </Animated.View>
                )}

                {activeTab === 'spending' && (
                    <View className="gap-3">
                        <InflationCharts type="spending" />
                        {mockCategories.map((category) => {
                            const inflation = ((category.total - category.previousTotal) / category.previousTotal) * 100;
                            const isExpanded = expandedCategory === category.id;
                            const Icon = category.icon;

                            return (
                                <View key={category.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                                    <TouchableOpacity
                                        onPress={() => toggleCategory(category.id)}
                                        className="p-4 flex-row items-center gap-3"
                                        activeOpacity={0.7}
                                    >
                                        <View className="w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                                            <Icon size={24} color="#10B981" />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="font-semibold text-foreground">{category.name}</Text>
                                            <Text className="text-lg font-bold text-foreground">R$ {category.total.toFixed(2)}</Text>
                                        </View>
                                        <View className="items-end">
                                            <Text className={cn("text-sm font-semibold", inflation > 0 ? "text-destructive" : "text-primary")}>
                                                {inflation > 0 ? "+" : ""}{inflation.toFixed(1)}%
                                            </Text>
                                            {isExpanded ? <ChevronUp size={20} color="#64748B" /> : <ChevronDown size={20} color="#64748B" />}
                                        </View>
                                    </TouchableOpacity>

                                    {isExpanded && (
                                        <View className="bg-muted/20 border-t border-border/30 p-4 pt-2">
                                            {category.items.map((item, idx) => (
                                                <View key={idx} className="flex-row justify-between py-1">
                                                    <Text className="text-foreground text-sm">{item.name} (x{item.quantity})</Text>
                                                    <Text className="text-muted-foreground text-sm">R$ {(item.price * item.quantity).toFixed(2)}</Text>
                                                </View>
                                            ))}

                                            <View className="mt-2 pt-2 border-t border-border/20">
                                                <Text className="text-xs text-muted-foreground mb-1">Impostos pagos:</Text>
                                                <View className="flex-row justify-between">
                                                    <Text className="text-xs text-muted-foreground">ICMS</Text>
                                                    <Text className="text-xs text-foreground">R$ {category.taxes.icms.toFixed(2)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}

                {activeTab === 'taxes' && (
                    <Animated.View entering={FadeInDown.duration(300)} className="gap-4">
                        <View className="bg-red-500/10 rounded-2xl p-5 border border-red-500/20">
                            <View className="flex-row items-center gap-3 mb-3">
                                <View className="w-12 h-12 rounded-xl bg-red-500/20 items-center justify-center">
                                    <Percent size={24} color="#EF4444" />
                                </View>
                                <View>
                                    <Text className="text-sm text-muted-foreground">Total em Impostos</Text>
                                    <Text className="text-2xl font-bold text-foreground">R$ {totalTaxAmount.toFixed(2)}</Text>
                                </View>
                            </View>
                            <Text className="text-sm text-muted-foreground">
                                Representa <Text className="font-semibold text-destructive">{taxPercentage.toFixed(1)}%</Text> do total gasto
                            </Text>
                        </View>

                        <View className="bg-card rounded-2xl p-4 border border-border/50 gap-4">
                            <Text className="font-semibold text-foreground">Detalhamento</Text>

                            {[
                                { label: 'ICMS', value: totalTaxes.icms, color: 'bg-primary', desc: 'Circulação de Mercadorias' },
                                { label: 'COFINS', value: totalTaxes.cofins, color: 'bg-indigo-500', desc: 'Seguridade Social' },
                                { label: 'PIS', value: totalTaxes.pis, color: 'bg-orange-500', desc: 'Integração Social' },
                            ].map((tax) => (
                                <View key={tax.label} className="gap-2">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="font-medium text-foreground">{tax.label}</Text>
                                        <Text className="font-bold text-foreground">R$ {tax.value.toFixed(2)}</Text>
                                    </View>
                                    <Text className="text-xs text-muted-foreground">{tax.desc}</Text>
                                    <View className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <View
                                            className={`h-full ${tax.color} rounded-full`}
                                            style={{ width: `${(tax.value / totalTaxAmount) * 100}%` }}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
