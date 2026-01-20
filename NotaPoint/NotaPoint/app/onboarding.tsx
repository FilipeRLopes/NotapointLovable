import React, { useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ScanLine, TrendingDown, Bell, ChevronRight } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const steps = [
    {
        icon: ScanLine,
        title: "Escaneie suas notas",
        description: "Aponte a câmera para o QR Code da nota fiscal e registre seus preços automaticamente.",
        color: "hsl(160, 100%, 22%)"
    },
    {
        icon: TrendingDown,
        title: "Compare preços",
        description: "Descubra onde encontrar os melhores preços na sua cidade em tempo real.",
        color: "#f59e0b"
    },
    {
        icon: Bell,
        title: "Receba alertas",
        description: "Seja notificado quando os produtos que você compra ficarem mais baratos.",
        color: "#3b82f6"
    },
];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            await AsyncStorage.setItem('onboarding_complete', 'true');
            router.replace('/(tabs)');
        }
    };

    const handleSkip = async () => {
        await AsyncStorage.setItem('onboarding_complete', 'true');
        router.replace('/(tabs)');
    };

    const step = steps[currentStep];
    const Icon = step.icon;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
            <StatusBar style="auto" />

            {/* Header */}
            <View className="flex-row justify-between items-center p-6 mt-2">
                <View className="flex-row items-center gap-3">
                    <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center shadow-lg transform rotate-3">
                        <ScanLine size={24} color="white" />
                    </View>
                    <Text className="text-2xl font-black text-foreground tracking-tighter">NotaPoint</Text>
                </View>

                <Pressable onPress={handleSkip} className="px-4 py-2 rounded-full bg-muted/50">
                    <Text className="text-muted-foreground text-xs font-black uppercase tracking-widest">Pular</Text>
                </Pressable>
            </View>

            {/* Content Area */}
            <View className="flex-1 items-center justify-center px-8 relative overflow-hidden">
                {/* Decorative background circle */}
                <View
                    style={{ backgroundColor: step.color, opacity: 0.05 }}
                    className="absolute w-[500px] h-[500px] rounded-full -z-10"
                />

                <View className="items-center w-full">
                    <View
                        style={{ backgroundColor: step.color }}
                        className="w-32 h-32 rounded-[40px] items-center justify-center mb-10 shadow-2xl rotate-[-3deg]"
                    >
                        <Icon size={64} color="white" />
                    </View>

                    <Text className="text-4xl font-black text-foreground text-center mb-4 tracking-tighter leading-none">
                        {step.title}
                    </Text>
                    <Text className="text-lg text-muted-foreground text-center font-medium leading-6">
                        {step.description}
                    </Text>
                </View>

                {/* Step Indicators */}
                <View className="flex-row gap-2.5 mt-16">
                    {steps.map((_, i) => (
                        <View
                            key={i}
                            className={`h-2.5 rounded-full transition-all duration-300 ${i === currentStep ? "w-10 bg-primary shadow-sm" : "w-2.5 bg-muted-foreground/20"}`}
                        />
                    ))}
                </View>
            </View>

            {/* Footer Actions */}
            <View className="p-8 pb-12">
                <Button
                    variant="gradient"
                    onPress={handleNext}
                    className="w-full h-16 rounded-3xl shadow-glow"
                >
                    <View className="flex-row items-center gap-3">
                        <Text className="text-white text-lg font-black tracking-tight">
                            {currentStep === steps.length - 1 ? "Começar Agora" : "Continuar"}
                        </Text>
                        <ChevronRight size={24} color="white" />
                    </View>
                </Button>
            </View>
        </SafeAreaView>
    );
}
