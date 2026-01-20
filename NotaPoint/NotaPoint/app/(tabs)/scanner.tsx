import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Zap, Image as ImageIcon, Camera } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { ScannerView } from '@/components/scanner/ScannerView';
import { StatusBar } from 'expo-status-bar';

export default function Scanner() {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        // Simulate scan processing
        setTimeout(() => {
            router.push('/receipt-result');
            setIsScanning(false);
        }, 2000);
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar style="light" />

            <ScannerView />

            {/* Header Controls */}
            <SafeAreaView className="absolute top-0 left-0 right-0">
                <View className="flex-row justify-between items-center px-6 py-4">
                    <Pressable
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full bg-black/40 items-center justify-center border border-white/10"
                    >
                        <X size={24} color="white" />
                    </Pressable>

                    <View className="flex-row gap-4">
                        <Pressable className="w-10 h-10 rounded-full bg-black/40 items-center justify-center border border-white/10">
                            <Zap size={20} color="white" />
                        </Pressable>
                        <Pressable className="w-10 h-10 rounded-full bg-black/40 items-center justify-center border border-white/10">
                            <ImageIcon size={20} color="white" />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>

            {/* Bottom Action Area */}
            <SafeAreaView className="absolute bottom-24 left-0 right-0">
                <View className="px-8">
                    {isScanning ? (
                        <View className="bg-primary h-16 rounded-3xl items-center justify-center shadow-lg">
                            <View className="flex-row items-center gap-3">
                                <ActivityIndicator color="white" />
                                <Text className="text-white text-lg font-black tracking-tight">Processando Nota...</Text>
                            </View>
                        </View>
                    ) : (
                        <Button
                            variant="gradient"
                            onPress={handleScan}
                            className="w-full h-16 rounded-3xl shadow-glow"
                        >
                            <View className="flex-row items-center gap-3">
                                <Camera size={24} color="white" />
                                <Text className="text-white text-lg font-black tracking-tight">Escanear Nota Fiscal</Text>
                            </View>
                        </Button>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}
