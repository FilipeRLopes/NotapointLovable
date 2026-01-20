// @ts-nocheck
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

// Mock data similar to the web prototype
const inflationData = [
    { value: 3.2, label: 'Jan' },
    { value: 2.8, label: 'Fev' },
    { value: 4.5, label: 'Mar' },
    { value: 3.8, label: 'Abr' },
    { value: 5.1, label: 'Mai' },
    { value: 4.2, label: 'Jun' },
];

const spendingData = [
    { value: 1245, label: 'Sup', frontColor: '#10B981' }, // Supermercado
    { value: 580, label: 'Com', frontColor: '#10B981' },  // Combustível
    { value: 287, label: 'Far', frontColor: '#10B981' },  // Farmácia
    { value: 245, label: 'Luz', frontColor: '#10B981' },  // Energia
];

export function InflationCharts({ type = 'inflation' }: { type?: 'inflation' | 'spending' }) {
    if (type === 'spending') {
        return (
            <View className="bg-card p-4 rounded-2xl border border-border/50 items-center">
                <Text className="text-base font-semibold text-foreground mb-4 self-start">Gastos por Categoria</Text>
                <BarChart
                    data={spendingData}
                    width={width - 80}
                    height={200}
                    yAxisTextStyle={{ color: '#94A3B8', fontSize: 10 }}
                    xAxisLabelTextStyle={{ color: '#94A3B8', fontSize: 10 }}
                    barWidth={32}
                    spacing={24}
                    roundedTop
                    hideRules
                    yAxisThickness={0}
                    xAxisThickness={0}
                    noOfSections={4}
                />
            </View>
        );
    }

    return (
        <View className="bg-card p-4 rounded-2xl border border-border/50 items-center">
            <Text className="text-base font-semibold text-foreground mb-4 self-start">Histórico de Inflação Pessoal</Text>
            <LineChart
                data={inflationData}
                width={width - 80}
                height={200}
                color="#EF4444"
                thickness={3}
                dataPointsColor="#EF4444"
                yAxisTextStyle={{ color: '#94A3B8', fontSize: 10 }}
                xAxisLabelTextStyle={{ color: '#94A3B8', fontSize: 10 }}
                hideRules
                hideYAxisText={false}
                yAxisThickness={0}
                xAxisThickness={0}
                curved
                isAnimated
                noOfSections={4}
                areaChart
                startFillColor="rgba(239, 68, 68, 0.2)"
                endFillColor="rgba(239, 68, 68, 0.0)"
                startOpacity={0.9}
                endOpacity={0.2}
            />
        </View>
    );
}
