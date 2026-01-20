// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft, SlideInRight, SlideOutLeft, Layout, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ScanLine, TrendingDown, Bell, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const steps = [
    {
        icon: ScanLine,
        title: "Escaneie suas notas",
        description: "Aponte a câmera para o QR Code da nota fiscal e registre seus preços automaticamente.",
    },
    {
        icon: TrendingDown,
        title: "Compare preços",
        description: "Descubra onde encontrar os melhores preços na sua cidade em tempo real.",
    },
    {
        icon: Bell,
        title: "Receba alertas",
        description: "Seja notificado quando os produtos que você compra ficarem mais baratos.",
    },
];

function PulseCircle() {
    const scale = useSharedValue(1);

    React.useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.2, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: 0.3,
    }));

    return (
        <Animated.View
            style={animatedStyle}
            className="absolute inset-0 bg-primary/20 rounded-full"
        />
    );
}

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            await AsyncStorage.setItem("onboarding_complete", "true");
            router.replace("/(tabs)");
        }
    };

    const handleSkip = async () => {
        await AsyncStorage.setItem("onboarding_complete", "true");
        router.replace("/(tabs)");
    };

    const StepIcon = steps[currentStep].icon;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 max-w-md mx-auto w-full">
                {/* Header */}
                <View className="flex-row justify-between items-center p-6">
                    <View className="flex-row items-center gap-2">
                        <View className="w-10 h-10 bg-primary rounded-xl items-center justify-center">
                            <ScanLine size={20} color="#FFFFFF" />
                        </View>
                        <Text className="text-xl font-bold text-foreground">NotaPoint</Text>
                    </View>

                    <TouchableOpacity onPress={handleSkip}>
                        <Text className="text-muted-foreground font-medium">Pular</Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View className="flex-1 items-center justify-center px-8">
                    <Animated.View
                        key={currentStep}
                        entering={FadeInRight.duration(500)} // Simple fade/slide for now
                        exiting={FadeOutLeft.duration(500)}
                        className="items-center w-full"
                    >
                        {/* Icon Circle */}
                        <View className="w-64 h-64 rounded-full bg-primary/5 items-center justify-center mb-8 relative">
                            <PulseCircle />
                            <StepIcon size={80} color="#10B981" />
                        </View>

                        <Text className="text-3xl font-bold text-foreground text-center mb-4">
                            {steps[currentStep].title}
                        </Text>

                        <Text className="text-muted-foreground text-center text-lg leading-relaxed">
                            {steps[currentStep].description}
                        </Text>

                        {/* Dots Indicator */}
                        <View className="flex-row gap-2 mt-8">
                            {steps.map((_, index) => (
                                <View
                                    key={index}
                                    className={`h-2 rounded-full transition-all ${index === currentStep ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                                        }`}
                                />
                            ))}
                        </View>
                    </Animated.View>
                </View>

                {/* Footer */}
                <View className="p-6 pb-10">
                    <TouchableOpacity
                        onPress={handleNext}
                        className="w-full h-14 bg-primary rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        activeOpacity={0.9}
                    >
                        <Text className="text-primary-foreground text-lg font-semibold">
                            {currentStep === steps.length - 1 ? "Começar" : "Continuar"}
                        </Text>
                        <ChevronRight size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
