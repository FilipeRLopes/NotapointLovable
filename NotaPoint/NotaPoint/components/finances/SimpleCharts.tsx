import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Svg, Path, Defs, LinearGradient as SvgGradient, Stop, Rect, G, Circle, Line as SvgLine, Text as SvgText } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Y_AXIS_WIDTH = 45; // Slightly more space for labels like "R$ 10.0"
const CHART_H_PADDING = 88; // px-6 (48) + p-5 (40) = 88

// Helper to generate smooth path (simple version)
const getSmoothPath = (data: number[], width: number, height: number, min: number, range: number) => {
    if (data.length < 2) return "";
    const effectiveWidth = width - Y_AXIS_WIDTH - 10; // Extra padding on right for the last dot
    const step = effectiveWidth / (data.length - 1);
    const points = data.map((val, i) => ({
        x: Y_AXIS_WIDTH + i * step,
        y: height - ((val - min) / (range || 1)) * (height - 20) - 10 // Padded top and bottom
    }));

    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(i - 1, 0)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(i + 2, points.length - 1)];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
};

// Helper for grid lines and Y-Axis labels
const YAxisWithGrid = ({ width, height, min, max, count = 4, formatter }: { width: number, height: number, min: number, max: number, count?: number, formatter?: (v: number) => string }) => {
    const lines = [];
    const labels = [];
    const range = max - min;

    for (let i = 0; i <= count; i++) {
        // Vertical position padded
        const y = 10 + ((height - 20) / count) * i;
        const val = max - (range / count) * i;

        lines.push(
            <SvgLine key={`line-${i}`} x1={Y_AXIS_WIDTH} y1={y} x2={width - 5} y2={y} stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3 3" />
        );

        labels.push(
            <SvgText
                key={`label-${i}`}
                x={Y_AXIS_WIDTH - 10}
                y={y + 4}
                fill="#a3a3a3"
                fontSize="10"
                textAnchor="end"
                fontWeight="700"
            >
                {formatter ? formatter(val) : val.toFixed(1)}
            </SvgText>
        );
    }
    return <G>{lines}{labels}</G>;
};

// 1. Comparative Line Chart (IPCA vs Personal) - Enhanced with Y-Axis
export function ComparativeLineChart({
    personalData,
    ipcaData,
    height = 150
}: { personalData: number[], ipcaData: number[], height?: number }) {
    const width = SCREEN_WIDTH - CHART_H_PADDING;
    const allData = [...personalData, ...ipcaData];
    const max = Math.max(...allData, 1);
    const min = Math.min(...allData, 0);
    const range = max - min;

    const personalPath = getSmoothPath(personalData, width, height, min, range);
    const ipcaPath = getSmoothPath(ipcaData, width, height, min, range);

    return (
        <View style={{ height, width }}>
            <Svg height={height} width={width}>
                <YAxisWithGrid width={width} height={height} min={min} max={max} formatter={(v) => `${v.toFixed(1)}%`} />
                {/* IPCA Line */}
                <Path
                    d={ipcaPath}
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                    opacity={0.3}
                />
                {/* Personal Line */}
                <Path
                    d={personalPath}
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                />
                {/* Dots for the current/last point */}
                {personalData.length > 0 && (
                    <Circle
                        cx={width - 10}
                        cy={height - ((personalData[personalData.length - 1] - min) / (range || 1)) * (height - 20) - 10}
                        r="5"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="2"
                    />
                )}
            </Svg>
        </View>
    );
}

// 2. Area Gradient Chart (Purchasing Power) - Enhanced with Y-Axis
export function AreaGradientChart({ data, height = 120 }: { data: number[], height?: number }) {
    const width = SCREEN_WIDTH - CHART_H_PADDING;
    const max = 100;
    const min = 80;
    const range = max - min;

    const path = getSmoothPath(data, width, height, min, range);
    const areaPath = `${path} L ${width - 10},${height - 10} L ${Y_AXIS_WIDTH},${height - 10} Z`;

    return (
        <View style={{ height, width }}>
            <Svg height={height} width={width}>
                <Defs>
                    <SvgGradient id="devalGradient" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor="#ef4444" stopOpacity="0.3" />
                        <Stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                    </SvgGradient>
                </Defs>
                <YAxisWithGrid width={width} height={height} min={min} max={max} count={4} formatter={(v) => `R$${Math.round(v)}`} />
                <Path d={areaPath} fill="url(#devalGradient)" />
                <Path d={path} stroke="#ef4444" strokeWidth="2" fill="none" />
                {/* Dots */}
                {data.map((val, i) => (
                    <Circle
                        key={i}
                        cx={Y_AXIS_WIDTH + ((width - Y_AXIS_WIDTH - 10) / (data.length - 1)) * i}
                        cy={height - ((val - min) / (range || 1)) * (height - 20) - 10}
                        r="3"
                        fill="#ef4444"
                    />
                ))}
            </Svg>
        </View>
    );
}

// 3. Multi-Bar Chart for Product Analysis
export function ProductAnalysisBarChart({
    economy, taxes, marketAverage, height = 200
}: { economy: number, taxes: number, marketAverage: number, height?: number }) {
    const maxVal = Math.max(economy, taxes, marketAverage, 1);
    const getWidth = (val: number) => (val / maxVal) * 100 + '%';

    return (
        <View style={{ height }} className="gap-6 justify-center">
            {/* Economia */}
            <View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-xs font-bold text-muted-foreground uppercase">Economia</Text>
                    <Text className="text-xs font-bold text-[#10b981]">R$ {economy.toFixed(2)}</Text>
                </View>
                <View className="h-4 bg-muted rounded-full overflow-hidden">
                    <View style={{ width: getWidth(economy) as any }} className="h-full bg-[#10b981] rounded-full" />
                </View>
            </View>

            {/* Impostos */}
            <View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-xs font-bold text-muted-foreground uppercase">Impostos</Text>
                    <Text className="text-xs font-bold text-[#ef4444]">R$ {taxes.toFixed(2)}</Text>
                </View>
                <View className="h-4 bg-muted rounded-full overflow-hidden">
                    <View style={{ width: getWidth(taxes) as any }} className="h-full bg-[#ef4444] rounded-full" />
                </View>
            </View>

            {/* Média Mercado */}
            <View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-xs font-bold text-muted-foreground uppercase">Média Mercado</Text>
                    <Text className="text-xs font-bold text-foreground">R$ {marketAverage.toFixed(2)}</Text>
                </View>
                <View className="h-4 bg-muted rounded-full overflow-hidden">
                    <View style={{ width: getWidth(marketAverage) as any }} className="h-full bg-[#00704b] rounded-full" />
                </View>
            </View>
        </View>
    );
}

// 4. Mini Sparkline
export function MiniSparkline({ data, width = 60, height = 24 }: { data: number[], width?: number, height?: number }) {
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 1);
    const range = max - min;

    return (
        <View style={{ width, height, flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
            {data.map((val, i) => {
                const barHeight = ((val - min) / (range || 1)) * (height - 4) + 2;
                return (
                    <View key={i} style={{ width: (width / data.length) - 2, height: barHeight, backgroundColor: '#10b981', borderRadius: 1 }} />
                );
            })}
        </View>
    );
}

// 5. Price History Chart (New) - Enhanced with Y-Axis
export function PriceHistoryLineChart({
    myData,
    marketData,
    height = 100
}: { myData: number[], marketData: number[], height?: number }) {
    const width = SCREEN_WIDTH - CHART_H_PADDING;
    const allData = [...myData, ...marketData];
    const max = Math.max(...allData, 1);
    const min = Math.min(...allData, 0);
    const range = max - min;

    const myPath = getSmoothPath(myData, width, height, min, range);
    const marketPath = getSmoothPath(marketData, width, height, min, range);

    return (
        <View style={{ height, width }}>
            <Svg height={height} width={width}>
                <YAxisWithGrid width={width} height={height} min={min} max={max} count={3} formatter={(v) => `R$${v.toFixed(1)}`} />
                {/* Market Line (Dashed) */}
                <Path
                    d={marketPath}
                    stroke="#737373"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="none"
                    opacity={0.5}
                />
                {/* My Price Line */}
                <Path
                    d={myPath}
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                />
                <Circle
                    cx={width - 10}
                    cy={height - ((myData[myData.length - 1] - min) / (range || 1)) * (height - 20) - 10}
                    r="4"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="2"
                />
            </Svg>
        </View>
    );
}



