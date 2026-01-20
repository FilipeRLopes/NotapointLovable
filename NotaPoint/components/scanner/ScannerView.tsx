// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, withSequence } from 'react-native-reanimated';
import { ScanLine, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7;

interface ScannerViewProps {
    isScanning?: boolean;
    onScan?: () => void;
    // We'll pass children as the camera component to keep this view pure UI overlay
    children?: React.ReactNode;
}

export function ScannerView({ isScanning = false, onScan, children }: ScannerViewProps) {
    const scanLinePos = useSharedValue(0);

    useEffect(() => {
        if (isScanning) {
            scanLinePos.value = withRepeat(
                withTiming(1, { duration: 2000, easing: Easing.linear }),
                -1,
                false
            );
        } else {
            scanLinePos.value = 0;
        }
    }, [isScanning]);

    const animatedLineStyle = useAnimatedStyle(() => ({
        top: `${scanLinePos.value * 100}%`,
    }));

    return (
        <View className="flex-1 bg-black justify-center items-center overflow-hidden">
            {/* Camera Background */}
            <View className="absolute inset-0">
                {children}
            </View>

            {/* Overlay to darken outside scanner area */}
            {/* Top */}
            <View className="absolute top-0 left-0 right-0 h-[calc(50%_-_144px)] bg-black/60" style={{ height: (Dimensions.get('window').height - SCANNER_SIZE) / 2 }} />
            {/* Bottom */}
            <View className="absolute bottom-0 left-0 right-0 bg-black/60" style={{ height: (Dimensions.get('window').height - SCANNER_SIZE) / 2 }} />
            {/* Left */}
            <View className="absolute left-0 top-[calc(50%_-_144px)] bg-black/60" style={{ top: (Dimensions.get('window').height - SCANNER_SIZE) / 2, height: SCANNER_SIZE, width: (width - SCANNER_SIZE) / 2 }} />
            {/* Right */}
            <View className="absolute right-0 top-[calc(50%_-_144px)] bg-black/60" style={{ top: (Dimensions.get('window').height - SCANNER_SIZE) / 2, height: SCANNER_SIZE, width: (width - SCANNER_SIZE) / 2 }} />

            {/* Scanner frame */}
            <TouchableOpacity
                className="relative"
                style={{ width: SCANNER_SIZE, height: SCANNER_SIZE }}
                activeOpacity={1}
                onPress={onScan}
            >
                {/* Corner decorations */}
                <View className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-primary rounded-tl-2xl" />
                <View className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-primary rounded-tr-2xl" />
                <View className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-primary rounded-bl-2xl" />
                <View className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-primary rounded-br-2xl" />

                {/* Scanning line */}
                {isScanning && (
                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                left: 16,
                                right: 16,
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: '#FCC000', // Accent color approx
                                shadowColor: '#FCC000',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 10,
                                elevation: 5,
                            },
                            animatedLineStyle
                        ]}
                    />
                )}

                {/* Center icon */}
                {!isScanning && (
                    <View className="absolute inset-0 items-center justify-center">
                        <View className="w-20 h-20 rounded-2xl bg-primary/20 items-center justify-center">
                            <ScanLine size={40} color="#FFFFFF" />
                        </View>
                    </View>
                )}
            </TouchableOpacity>

            {/* Instructions */}
            <View className="absolute bottom-40 left-0 right-0 items-center">
                <Text className="text-white text-lg font-medium mb-1">
                    {isScanning ? "Processando..." : "Aponte para o QR Code"}
                </Text>
                <Text className="text-white/60 text-sm">
                    da sua nota fiscal
                </Text>
            </View>

            {/* Flash hint */}
            <View className="absolute bottom-24 flex-row items-center gap-2 opacity-60">
                <Zap size={16} color="#FFFFFF" />
                <Text className="text-white text-sm">Toque para ativar flash</Text>
            </View>
        </View>
    );
}
