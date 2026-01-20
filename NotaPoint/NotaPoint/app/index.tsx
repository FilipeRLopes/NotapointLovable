import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const completed = await AsyncStorage.getItem("onboarding_complete");
            if (completed === "true") {
                router.replace("/(tabs)");
            } else {
                router.replace("/onboarding");
            }
        } catch (e) {
            console.error(e);
            router.replace("/onboarding");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-background">
            <ActivityIndicator size="large" color="hsl(160, 100%, 22%)" />
        </View>
    );
}
