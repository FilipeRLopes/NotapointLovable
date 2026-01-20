// @ts-nocheck
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from "@/components/ui/button";
import { X, Zap, Image, Flashlight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScannerView } from "@/components/scanner/ScannerView";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [torch, setTorch] = useState(false);
    const router = useRouter();

    // Rotation animation for spinner
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (isScanning) {
            rotation.value = withRepeat(
                withTiming(360, { duration: 1000, easing: Easing.linear }),
                -1,
                false
            );
        } else {
            rotation.value = 0;
        }
    }, [isScanning]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className="flex-1 justify-center items-center bg-background p-4">
                <Text className="text-foreground text-center mb-4">Precisamos da permissão da câmera para escanear.</Text>
                <Button onPress={requestPermission} label="Conceder permissão" />
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        if (scanned || isScanning) return;

        // Vibrate/Haptic feedback here optionally
        handleScan();
    };

    const handleScan = () => {
        if (isScanning) return;

        setIsScanning(true);
        setScanned(true);

        // Simulate delay
        setTimeout(() => {
            setIsScanning(false);
            setScanned(false);
            router.push("/receipt-result"); // Assuming this route exists or matches the web one
        }, 2000);
    };

    const toggleTorch = () => {
        setTorch(!torch);
    }

    return (
        <View className="flex-1 bg-black">
            {/* Use CameraView from expo-camera */}
            {/* We put ScannerView inside a absolute container overlaying the camera,
           OR we put Camera as children of ScannerView if structured that way.
           ScannerView currently takes children and renders them "absolute inset-0". perfect.
       */}
            <ScannerView isScanning={isScanning} onScan={handleScan}>
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                    enableTorch={torch}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                />
            </ScannerView>

            {/* Header Controls */}
            <SafeAreaView className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center rounded-full bg-black/40"
                >
                    <X size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={toggleTorch}
                        className={`w-10 h-10 items-center justify-center rounded-full ${torch ? 'bg-primary/80' : 'bg-black/40'}`}
                    >
                        <Zap size={24} color={torch ? '#FFFFFF' : '#FFFFFF'} fill={torch ? '#FFFFFF' : 'none'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-10 h-10 items-center justify-center rounded-full bg-black/40"
                    >
                        <Image size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Bottom Action */}
            <View className="absolute bottom-10 left-0 right-0 p-6">
                <TouchableOpacity
                    onPress={handleScan}
                    disabled={isScanning}
                    className="w-full h-14 rounded-2xl bg-primary items-center justify-center shadow-lg"
                    activeOpacity={0.8}
                >
                    {isScanning ? (
                        <View className="flex-row items-center gap-2">
                            <Animated.View style={[
                                {
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    borderTopColor: '#FFFFFF',
                                },
                                animatedStyle
                            ]} />
                            <Text className="text-primary-foreground text-lg font-semibold">Escaneando...</Text>
                        </View>
                    ) : (
                        <Text className="text-primary-foreground text-lg font-semibold">Escanear Nota Fiscal</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
