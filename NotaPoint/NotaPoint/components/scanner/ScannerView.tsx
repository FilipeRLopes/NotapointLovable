import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing
} from 'react-native-reanimated';
import { ScanLine } from 'lucide-react-native';

export function ScannerView() {
    const scanLinePos = useSharedValue(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
        scanLinePos.value = withRepeat(
            withTiming(1, { duration: 2500, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
            -1,
            true
        );
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.6, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedLineStyle = useAnimatedStyle(() => ({
        top: `${scanLinePos.value * 100}%`,
    }));

    const animatedFrameStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View className="flex-1 bg-black relative items-center justify-center">
            {/* Simulated Camera View background */}
            <View className="absolute inset-0 bg-slate-900 opacity-40">
                {/* Add some noise or grid pattern here if needed */}
            </View>

            {/* Instruction */}
            <View className="absolute top-32 px-10 text-center z-10">
                <Text className="text-white text-lg font-bold text-center">Aponte para o QR Code</Text>
                <Text className="text-white/60 text-sm text-center mt-1">O escaneamento será feito automaticamente</Text>
            </View>

            {/* Main Scanner Container */}
            <View className="relative w-72 h-72">
                {/* Corner Brackets */}
                <Animated.View style={animatedFrameStyle} className="absolute inset-0">
                    {/* Top Left */}
                    <View className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                    {/* Top Right */}
                    <View className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                    {/* Bottom Left */}
                    <View className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                    {/* Bottom Right */}
                    <View className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                </Animated.View>

                {/* Scanning Area */}
                <View className="absolute inset-2 bg-white/5 rounded-xl overflow-hidden">
                    <Animated.View
                        style={[animatedLineStyle]}
                        className="absolute left-0 right-0 h-1 bg-primary shadow shadow-primary"
                    >
                        <View className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-primary/50 to-transparent" />
                    </Animated.View>
                </View>
            </View>

            {/* Bottom Tip */}
            <View className="absolute bottom-40 flex-row items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                <ScanLine size={16} color="white" />
                <Text className="text-white/80 text-xs font-medium">QR Code detectado automaticamente</Text>
            </View>
        </View>
    );
}
