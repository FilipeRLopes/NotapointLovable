// @ts-nocheck
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import {
    ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle,
    FileText, LogOut, ChevronRight, Smartphone, MapPin,
    Trash2
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingToggle {
    id: string;
    icon: React.ElementType;
    label: string;
    description: string;
    enabled: boolean;
}

const initialToggles: SettingToggle[] = [
    {
        id: "notifications",
        icon: Bell,
        label: "Notificações Push",
        description: "Receba alertas de preços e ofertas",
        enabled: true,
    },
    {
        id: "darkMode",
        icon: Moon,
        label: "Modo Escuro",
        description: "Alternar tema da interface",
        enabled: false,
    },
    {
        id: "location",
        icon: MapPin,
        label: "Localização",
        description: "Usar GPS para encontrar lojas próximas",
        enabled: true,
    },
];

const menuSections = [
    {
        title: "Preferências",
        items: [
            { icon: Globe, label: "Idioma", value: "Português (BR)" },
            { icon: Smartphone, label: "Versão do App", value: "1.0.0" },
        ],
    },
    {
        title: "Conta",
        items: [
            { icon: Shield, label: "Privacidade e Segurança" },
            { icon: FileText, label: "Termos de Uso" },
            { icon: HelpCircle, label: "Ajuda e Suporte" },
        ],
    },
];

export default function Settings() {
    const router = useRouter();
    const [toggles, setToggles] = useState(initialToggles);

    const handleToggle = (id: string) => {
        setToggles((prev) =>
            prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                {/* Header */}
                <View className="flex-row items-center gap-4 mb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 rounded-xl bg-secondary"
                    >
                        <ArrowLeft size={24} className="text-foreground" color="#000000" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-foreground">Configurações</Text>
                </View>

                {/* Toggle Settings */}
                <Animated.View
                    entering={FadeInDown.duration(500)}
                    className="gap-3 mb-6"
                >
                    {toggles.map((toggle, index) => {
                        const Icon = toggle.icon;
                        return (
                            <Animated.View
                                key={toggle.id}
                                entering={FadeInRight.delay(index * 50).duration(400)}
                                className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm"
                            >
                                <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center">
                                    <Icon size={20} color="#10B981" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-medium text-foreground">{toggle.label}</Text>
                                    <Text className="text-sm text-muted-foreground">
                                        {toggle.description}
                                    </Text>
                                </View>
                                <Switch
                                    value={toggle.enabled}
                                    onValueChange={() => handleToggle(toggle.id)}
                                    trackColor={{ false: "#E2E8F0", true: "#10B981" }}
                                    thumbColor={toggle.enabled ? "#FFFFFF" : "#FFFFFF"}
                                />
                            </Animated.View>
                        );
                    })}
                </Animated.View>

                {/* Menu Sections */}
                {menuSections.map((section, sectionIndex) => (
                    <Animated.View
                        key={section.title}
                        entering={FadeInDown.delay(200 + sectionIndex * 100).duration(500)}
                        className="mb-6"
                    >
                        <Text className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                            {section.title}
                        </Text>
                        <View className="gap-2">
                            {section.items.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <TouchableOpacity
                                        key={item.label}
                                        className="w-full flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm"
                                        activeOpacity={0.7}
                                    >
                                        <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center">
                                            <Icon size={20} color="#10B981" />
                                        </View>
                                        <Text className="flex-1 text-base font-medium text-foreground">
                                            {item.label}
                                        </Text>
                                        {item.value ? (
                                            <Text className="text-sm text-muted-foreground">
                                                {item.value}
                                            </Text>
                                        ) : (
                                            <ChevronRight size={20} color="#94A3B8" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </Animated.View>
                ))}

                {/* Danger Zone */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(500)}
                    className="gap-2"
                >
                    <TouchableOpacity
                        className="w-full flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50"
                        onPress={() => Alert.alert("Sair", "Deseja realmente sair?")}
                    >
                        <View className="w-10 h-10 rounded-xl bg-red-500/10 items-center justify-center">
                            <LogOut size={20} color="#EF4444" />
                        </View>
                        <Text className="flex-1 text-base font-medium text-red-500">
                            Sair da conta
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-full flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-red-500/30">
                        <View className="w-10 h-10 rounded-xl bg-red-500/10 items-center justify-center">
                            <Trash2 size={20} color="#EF4444" />
                        </View>
                        <Text className="flex-1 text-base font-medium text-red-500">
                            Excluir conta
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* App Version */}
                <Text className="text-center text-xs text-muted-foreground mt-8 mb-4">
                    NotaPoint v1.0.0 • Feito com ❤️ no Brasil
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
