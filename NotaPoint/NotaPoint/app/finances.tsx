import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    ArrowLeft, TrendingUp, TrendingDown, Wallet, Receipt,
    Info, ChevronDown, ChevronUp, Search, Filter,
    ShoppingCart, DollarSign, Sparkles, Navigation,
    ChevronRight, Pill, Fuel, Zap, Clock, PieChart,
    BarChart3, LineChart as LineChartIcon, Calendar,
    ShoppingBag, Percent
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { ComparativeLineChart, AreaGradientChart, ProductAnalysisBarChart, MiniSparkline, PriceHistoryLineChart } from '@/components/finances/SimpleCharts';
import { MotiView, AnimatePresence } from 'moti';

const periods = [
    { label: 'Últimos 7 dias', value: '7' },
    { label: 'Últimos 30 dias', value: '30' },
    { label: 'Últimos 90 dias', value: '90' },
];

// Dynamic data based on period
const getDataForPeriod = (period: string) => {
    switch (period) {
        case '7':
            return {
                totalSpent: 856.40,
                inflation: 8.2,
                economy: 180.30,
                devaluation: -5.8,
                inflationData: [12, 11, 14, 13, 15, 14.9],
                ipcaData: [10.5, 11.2, 12.1, 12.5, 13.0, 13.5],
                purchasingPowerData: [100, 98.5, 96.2, 94.8, 92.5, 90.1],
                totalTaxes: 258.42
            };
        case '30':
            return {
                totalSpent: 2358.92,
                inflation: 14.9,
                economy: 394.60,
                devaluation: -12.4,
                inflationData: [10.5, 12, 11, 14, 13, 15, 14.9],
                ipcaData: [9.8, 10.5, 11.2, 12.1, 12.5, 13.0, 13.5],
                purchasingPowerData: [100, 98.5, 96.2, 94.8, 92.5, 90.1, 87.6],
                totalTaxes: 709.33
            };
        case '90':
            return {
                totalSpent: 7124.50,
                inflation: 18.5,
                economy: 1205.80,
                devaluation: -18.2,
                inflationData: [8.5, 10.5, 12, 11, 14, 13, 15, 14.9, 16.2, 17.8, 18.5],
                ipcaData: [7.8, 9.8, 10.5, 11.2, 12.1, 12.5, 13.0, 13.5, 14.2, 15.0, 15.8],
                purchasingPowerData: [100, 99.2, 98.5, 96.2, 94.8, 92.5, 90.1, 87.6, 85.2, 83.1, 81.8],
                totalTaxes: 2147.35
            };
        default:
            return getDataForPeriod('30');
    }
};

const productsAnalytics = [
    {
        id: "1",
        name: "Leite Integral Piracanjuba 1L",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
        economy: 15.20,
        taxes: 4.80,
        marketAverage: 25.00,
        currentPrice: 4.49,
        change: 12,
        history: [4.20, 4.40, 4.30, 4.60, 4.49],
        marketHistory: [4.80, 5.00, 5.20, 5.30, 5.40]
    },
    {
        id: "2",
        name: "Arroz Tio João 5kg",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
        economy: 45.00,
        taxes: 12.50,
        marketAverage: 65.00,
        currentPrice: 22.90,
        change: -5,
        history: [25.00, 26.00, 24.00, 23.00, 22.90],
        marketHistory: [28.00, 29.00, 30.00, 31.00, 32.50]
    },
];

const spendingCategories = [
    {
        id: '1',
        name: 'Supermercado',
        icon: ShoppingBag,
        amount: 1245.80,
        color: '#00704b',
        change: 8,
        items: [
            { name: "Arroz 5kg", price: 28.90, quantity: 3 },
            { name: "Feijão 1kg", price: 9.50, quantity: 4 },
        ],
        taxes: { icms: 224.24, iss: 0, pis: 20.56, cofins: 94.68 }
    },
    {
        id: '2',
        name: 'Farmácia',
        icon: Pill,
        amount: 287.45,
        color: '#3b82f6',
        change: -3,
        items: [
            { name: "Dipirona", price: 12.90, quantity: 2 },
        ],
        taxes: { icms: 48.87, iss: 0, pis: 4.74, cofins: 21.85 }
    },
];

export default function Finances() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'inflation' | 'spending' | 'taxes'>('inflation');
    const [selectedPeriod, setSelectedPeriod] = useState('30');
    const [isPeriodAccordionExpanded, setIsPeriodAccordionExpanded] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const periodData = getDataForPeriod(selectedPeriod);

    const handleSelectPeriod = (period: string) => {
        setSelectedPeriod(period);
        setIsPeriodAccordionExpanded(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1">
                {/* Header Section */}
                <View className="px-6 py-4">
                    <View className="flex-row items-center gap-4 mb-2">
                        <Pressable onPress={() => router.back()} className="p-2 rounded-xl bg-muted">
                            <ArrowLeft size={20} color="black" />
                        </Pressable>
                        <Text className="text-2xl font-bold text-foreground">Finanças Pessoais</Text>
                    </View>
                    <Text className="text-muted-foreground ml-12">Acompanhe seus gastos e inflação</Text>
                </View>

                {/* Period Selector - Accordion Style */}
                <View className="px-6 mb-6">
                    <Pressable
                        onPress={() => setIsPeriodAccordionExpanded(!isPeriodAccordionExpanded)}
                        className="flex-row items-center gap-3 bg-card border border-border/50 px-4 py-3 rounded-2xl shadow-sm active:opacity-70"
                    >
                        <Calendar size={18} color="#737373" />
                        <Text className="flex-1 text-sm font-medium text-foreground">
                            {periods.find(p => p.value === selectedPeriod)?.label}
                        </Text>
                        <MotiView
                            animate={{ rotate: isPeriodAccordionExpanded ? '180deg' : '0deg' }}
                            transition={{ type: 'timing', duration: 200 }}
                        >
                            <ChevronDown size={18} color="#737373" />
                        </MotiView>
                    </Pressable>

                    {/* Accordion Content */}
                    <AnimatePresence>
                        {isPeriodAccordionExpanded && (
                            <MotiView
                                from={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: 'timing', duration: 200 }}
                                className="mt-2 bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm"
                            >
                                {periods.map((period, index) => (
                                    <Pressable
                                        key={period.value}
                                        onPress={() => handleSelectPeriod(period.value)}
                                        className={`flex-row items-center justify-between px-4 py-3 ${index !== periods.length - 1 ? 'border-b border-border/30' : ''
                                            } ${selectedPeriod === period.value ? 'bg-primary/5' : ''} active:bg-muted/50`}
                                    >
                                        <Text className={`font-medium ${selectedPeriod === period.value ? 'text-primary' : 'text-foreground'}`}>
                                            {period.label}
                                        </Text>
                                        {selectedPeriod === period.value && (
                                            <View className="w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </Pressable>
                                ))}
                            </MotiView>
                        )}
                    </AnimatePresence>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Summary Cards Grid */}
                    <View className="px-6 mb-6">
                        <View className="flex-row gap-3">
                            <View className="flex-1 bg-card p-4 rounded-3xl border border-border/50 shadow-sm">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
                                        <DollarSign size={16} color="#00704b" />
                                    </View>
                                    <Text className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total Gasto</Text>
                                </View>
                                <Text className="text-xl font-bold text-foreground">R$ {periodData.totalSpent.toFixed(2).replace('.', ',')}</Text>
                            </View>
                            <View className="flex-1 bg-card p-4 rounded-3xl border border-destructive/30 shadow-sm">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <View className="w-8 h-8 rounded-lg bg-destructive/10 items-center justify-center">
                                        <TrendingUp size={16} color="#ef4444" />
                                    </View>
                                    <Text className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Inflação Pessoal</Text>
                                </View>
                                <Text className="text-xl font-bold text-destructive">+{periodData.inflation.toFixed(1)}%</Text>
                            </View>
                        </View>
                    </View>

                    {/* Main Tabs */}
                    <View className="px-6 mb-6">
                        <View className="flex-row bg-muted p-1 rounded-2xl">
                            {(['inflation', 'spending', 'taxes'] as const).map((tab) => (
                                <Pressable
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className={`flex-1 flex-row gap-2 py-3 rounded-xl items-center justify-center ${activeTab === tab ? 'bg-background shadow-sm' : ''}`}
                                >
                                    {tab === 'inflation' && <LineChartIcon size={16} color={activeTab === tab ? '#00704b' : '#737373'} />}
                                    {tab === 'spending' && <BarChart3 size={16} color={activeTab === tab ? '#00704b' : '#737373'} />}
                                    {tab === 'taxes' && <Receipt size={16} color={activeTab === tab ? '#00704b' : '#737373'} />}
                                    <Text className={`font-bold text-xs ${activeTab === tab ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {tab === 'inflation' ? 'Inflação' : tab === 'spending' ? 'Gastos' : 'Impostos'}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <View className="px-6">
                        {activeTab === 'inflation' && (
                            <View>
                                {/* Summary Sub-Cards */}
                                <View className="flex-row gap-3 mb-6">
                                    <View className="flex-1 bg-primary/5 p-4 rounded-3xl border border-primary/20">
                                        <View className="flex-row items-center gap-2 mb-2">
                                            <Sparkles size={16} color="#00704b" />
                                            <Text className="text-[10px] text-primary font-bold uppercase">Economia</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-primary">R$ {periodData.economy.toFixed(2).replace('.', ',')}</Text>
                                        <Text className="text-[8px] text-primary/70 font-medium">com o NotaPoint</Text>
                                    </View>
                                    <View className="flex-1 bg-destructive/5 p-4 rounded-3xl border border-destructive/20">
                                        <View className="flex-row items-center gap-2 mb-2">
                                            <TrendingDown size={16} color="#ef4444" />
                                            <Text className="text-[10px] text-destructive font-bold uppercase">Desvalorização</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-destructive">{periodData.devaluation.toFixed(1)}%</Text>
                                        <Text className="text-[8px] text-destructive/70 font-medium">poder de compra</Text>
                                    </View>
                                </View>

                                {/* Comparison Chart */}
                                <View className="bg-card p-5 rounded-[32px] border border-border/50 shadow-sm mb-6">
                                    <View className="flex-row justify-between items-center mb-6">
                                        <View>
                                            <Text className="text-base font-bold text-foreground">Inflação Geral vs Sua</Text>
                                            <Text className="text-xs text-muted-foreground">Comparativo de índices</Text>
                                        </View>
                                        <View className="flex-row gap-4">
                                            <View className="flex-row items-center gap-1.5">
                                                <View className="w-2 h-2 rounded-full bg-[#ef4444]" />
                                                <Text className="text-[10px] font-bold text-muted-foreground">IPCA</Text>
                                            </View>
                                            <View className="flex-row items-center gap-1.5">
                                                <View className="w-2 h-2 rounded-full bg-[#10b981]" />
                                                <Text className="text-[10px] font-bold text-muted-foreground">SUA</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View className="items-center">
                                        <ComparativeLineChart personalData={periodData.inflationData} ipcaData={periodData.ipcaData} height={150} />
                                    </View>
                                    <View className="flex-row justify-between mt-4">
                                        {['JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'].map(m => (
                                            <Text key={m} className="text-[10px] text-muted-foreground font-black">{m}</Text>
                                        ))}
                                    </View>
                                    <Text className="text-[10px] text-muted-foreground mt-4 text-center">
                                        Você economizou <Text className="text-primary font-bold">0.5%</Text> em relação à inflação oficial
                                    </Text>
                                </View>

                                {/* Purchasing Power */}
                                <View className="bg-card p-5 rounded-[32px] border border-border/50 shadow-sm mb-8">
                                    <View className="mb-4">
                                        <Text className="text-base font-bold text-foreground">Poder de Compra</Text>
                                        <Text className="text-xs text-muted-foreground">Quanto R$100 vale ao longo do tempo</Text>
                                    </View>
                                    <View className="items-center">
                                        <AreaGradientChart data={periodData.purchasingPowerData} height={120} />
                                    </View>
                                    <View className="flex-row justify-between mt-4">
                                        {['JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'].map(m => (
                                            <Text key={m} className="text-[10px] text-muted-foreground font-black">{m}</Text>
                                        ))}
                                    </View>
                                </View>

                                {/* Product List Refined */}
                                <Text className="text-lg font-bold text-foreground mb-4 ml-1">Análise por Produto</Text>
                                {productsAnalytics.map((p) => (
                                    <View key={p.id} className="mb-3">
                                        <Pressable
                                            onPress={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)}
                                            className="bg-card rounded-3xl p-4 border border-border/50 shadow-sm"
                                        >
                                            <View className="flex-row items-center gap-4">
                                                <Image source={{ uri: p.image }} className="w-12 h-12 rounded-2xl" />
                                                <View className="flex-1">
                                                    <Text className="font-bold text-foreground text-sm leading-tight mb-1" numberOfLines={1}>{p.name}</Text>
                                                    <View className="flex-row items-center gap-2">
                                                        <Text className="text-xs font-bold text-foreground">R$ {p.currentPrice.toFixed(2)}</Text>
                                                        <View className={`px-1.5 py-0.5 rounded-md ${p.change > 0 ? 'bg-destructive/10' : 'bg-success/10'}`}>
                                                            <Text className={`text-[8px] font-black ${p.change > 0 ? 'text-destructive' : 'text-success'}`}>
                                                                {p.change > 0 ? '+' : ''}{p.change}%
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View className="flex-row items-center gap-3">
                                                    <MiniSparkline data={p.history} />
                                                    {expandedProduct === p.id ? <ChevronUp size={18} color="#737373" /> : <ChevronDown size={18} color="#737373" />}
                                                </View>
                                            </View>

                                            {expandedProduct === p.id && (
                                                <View className="mt-4 pt-4 border-t border-border/50">
                                                    <View className="mb-4">
                                                        <Text className="text-xs font-bold text-muted-foreground uppercase mb-2">Histórico de Preço</Text>
                                                        <View className="items-center">
                                                            <PriceHistoryLineChart myData={p.history} marketData={p.marketHistory} height={100} />
                                                        </View>
                                                        <View className="flex-row justify-center gap-4 mt-2">
                                                            <View className="flex-row items-center gap-1">
                                                                <View className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                                                <Text className="text-[10px] text-muted-foreground">Você</Text>
                                                            </View>
                                                            <View className="flex-row items-center gap-1">
                                                                <View className="w-1.5 h-1.5 rounded-full bg-[#737373] opacity-50" />
                                                                <Text className="text-[10px] text-muted-foreground">Mercado</Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <ProductAnalysisBarChart economy={p.economy} taxes={p.taxes} marketAverage={p.marketAverage} height={140} />

                                                    <View className="mt-4 flex-row justify-between items-center bg-muted/30 p-3 rounded-2xl border border-border/30">
                                                        <View>
                                                            <Text className="text-[10px] text-muted-foreground uppercase font-black">Melhor Preço Registrado</Text>
                                                            <Text className="text-sm font-bold text-primary">R$ 3,89 (Atacadão)</Text>
                                                        </View>
                                                        <Navigation size={20} color="#00704b" />
                                                    </View>
                                                </View>
                                            )}
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        )}

                        {activeTab === 'spending' && (
                            <View>
                                <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-4">Gasto por Categoria</Text>
                                {spendingCategories.map((cat) => (
                                    <View key={cat.id} className="mb-3">
                                        <Pressable
                                            onPress={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                            className="bg-card p-4 rounded-3xl border border-border/50 shadow-sm"
                                        >
                                            <View className="flex-row items-center gap-4">
                                                <View className="w-12 h-12 rounded-2xl items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                                                    <cat.icon size={24} color={cat.color} />
                                                </View>
                                                <View className="flex-1">
                                                    <View className="flex-row items-center justify-between mb-1">
                                                        <Text className="font-bold text-foreground text-base">{cat.name}</Text>
                                                        <Text className="font-bold text-foreground">R$ {cat.amount.toFixed(2)}</Text>
                                                    </View>
                                                    <View className="flex-row items-center justify-between">
                                                        <Text className="text-[10px] text-muted-foreground font-medium">{cat.items.length} itens comprados</Text>
                                                        <View className="flex-row items-center gap-1">
                                                            {cat.change > 0 ? <TrendingUp size={10} color="#ef4444" /> : <TrendingDown size={10} color="#10b981" />}
                                                            <Text className={`text-[10px] font-black ${cat.change > 0 ? 'text-destructive' : 'text-success'}`}>{cat.change}%</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            {expandedCategory === cat.id && (
                                                <View className="mt-4 pt-4 border-t border-border/50">
                                                    <Text className="text-xs text-muted-foreground mb-3 uppercase font-bold">Itens Comprados:</Text>
                                                    <View className="gap-2 mb-4">
                                                        {cat.items.map((item, idx) => (
                                                            <View key={idx} className="flex-row justify-between items-center px-1">
                                                                <Text className="text-sm text-foreground">{item.name} (x{item.quantity})</Text>
                                                                <Text className="text-sm font-bold text-foreground">R$ {item.price.toFixed(2)}</Text>
                                                            </View>
                                                        ))}
                                                    </View>

                                                    <View className="pt-3 border-t border-border/30">
                                                        <Text className="text-xs text-muted-foreground mb-2 uppercase font-bold">Detalhamento de Impostos:</Text>
                                                        <View className="grid grid-cols-2 gap-x-6 gap-y-2">
                                                            <View className="flex-row justify-between">
                                                                <Text className="text-[10px] text-muted-foreground">ICMS</Text>
                                                                <Text className="text-[10px] font-bold text-foreground">R$ {cat.taxes.icms.toFixed(2)}</Text>
                                                            </View>
                                                            <View className="flex-row justify-between">
                                                                <Text className="text-[10px] text-muted-foreground">COFINS</Text>
                                                                <Text className="text-[10px] font-bold text-foreground">R$ {cat.taxes.cofins.toFixed(2)}</Text>
                                                            </View>
                                                            <View className="flex-row justify-between">
                                                                <Text className="text-[10px] text-muted-foreground">PIS</Text>
                                                                <Text className="text-[10px] font-bold text-foreground">R$ {cat.taxes.pis.toFixed(2)}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )}
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        )}

                        {activeTab === 'taxes' && (
                            <View>
                                <View className="bg-destructive/5 p-6 rounded-3xl border border-destructive/20 mb-8">
                                    <View className="flex-row items-center gap-4 mb-4">
                                        <View className="w-12 h-12 rounded-xl bg-destructive/10 items-center justify-center">
                                            <Percent size={24} color="#ef4444" />
                                        </View>
                                        <View>
                                            <Text className="text-sm text-muted-foreground font-medium">Total em Impostos</Text>
                                            <Text className="text-2xl font-bold text-foreground">R$ {periodData.totalTaxes.toFixed(2).replace('.', ',')}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <Text className="text-sm text-muted-foreground">
                                            Representa <Text className="font-bold text-destructive">{((periodData.totalTaxes / periodData.totalSpent) * 100).toFixed(1)}%</Text> do seu gasto total
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center justify-between mb-4 ml-1">
                                    <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Detalhamento por Tributo</Text>
                                    <Info size={14} color="#737373" />
                                </View>

                                {[
                                    { name: "ICMS", desc: "Imp. sobre Circulação de Mercadorias", val: 420.50, color: "#10b981", percent: 59 },
                                    { name: "COFINS / PIS", desc: "Contrib. Social e Integr. Social", val: 180.20, color: "#3b82f6", percent: 25 },
                                    { name: "Outros", desc: "IPI, ISS e taxas locais", val: 108.63, color: "#737373", percent: 16 }
                                ].map((tax) => (
                                    <View key={tax.name} className="bg-card p-5 rounded-3xl border border-border/50 shadow-sm mb-3">
                                        <View className="flex-row justify-between items-start mb-3">
                                            <View className="flex-1 mr-4">
                                                <Text className="font-bold text-foreground text-sm mb-0.5">{tax.name}</Text>
                                                <Text className="text-[10px] text-muted-foreground font-medium leading-[14px]">{tax.desc}</Text>
                                            </View>
                                            <View className="items-end">
                                                <Text className="font-bold text-foreground text-base">R$ {tax.val.toFixed(2).replace('.', ',')}</Text>
                                                <Text className="text-[10px] font-bold text-muted-foreground">{tax.percent}%</Text>
                                            </View>
                                        </View>
                                        <View className="h-1.5 bg-muted rounded-full overflow-hidden">
                                            <View style={{ width: `${tax.percent}%`, backgroundColor: tax.color }} className="h-full rounded-full" />
                                        </View>
                                    </View>
                                ))}

                                <View className="mt-4 p-5 bg-muted/30 rounded-3xl border border-border/30 border-dashed">
                                    <Text className="text-[11px] text-muted-foreground leading-relaxed italic text-center">
                                        "Os valores exibidos são estimativas baseadas na legislação tributária vigente e nos dados das notas fiscais lidas."
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

