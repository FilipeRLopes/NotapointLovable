import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle,
    FileText, LogOut, ChevronRight, Smartphone, MapPin,
    Trash2,
    LucideIcon
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface MenuItem {
    icon: LucideIcon;
    label: string;
    value?: string;
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

export default function Settings() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [location, setLocation] = useState(true);

    const menuSections: MenuSection[] = [
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

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar style="auto" />
            <View className="flex-1 px-4">
                {/* Header */}
                <View className="flex-row items-center gap-4 mt-4 mb-6">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-xl bg-muted">
                        <ArrowLeft size={20} color="black" />
                    </Pressable>
                    <Text className="text-xl font-bold text-foreground">Configurações</Text>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Toggles */}
                    <View className="gap-3 mb-6">
                        <View className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                            <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center">
                                <Bell size={20} color="#00704b" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-foreground">Notificações Push</Text>
                                <Text className="text-xs text-muted-foreground">Alertas de preços e ofertas</Text>
                            </View>
                            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#00704b' }} />
                        </View>

                        <View className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                            <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center">
                                <Moon size={20} color="#00704b" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-foreground">Modo Escuro</Text>
                                <Text className="text-xs text-muted-foreground">Alternar tema da interface</Text>
                            </View>
                            <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#00704b' }} />
                        </View>

                        <View className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                            <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center">
                                <MapPin size={20} color="#00704b" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-foreground">Localização</Text>
                                <Text className="text-xs text-muted-foreground">Usar GPS para encontrar lojas</Text>
                            </View>
                            <Switch value={location} onValueChange={setLocation} trackColor={{ true: '#00704b' }} />
                        </View>
                    </View>

                    {/* Sections */}
                    {menuSections.map((section) => (
                        <View key={section.title} className="mb-6">
                            <Text className="text-xs font-bold text-muted-foreground mb-3 px-1 uppercase tracking-widest">{section.title}</Text>
                            <View className="gap-2">
                                {section.items.map((item) => (
                                    <Pressable key={item.label} className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                                        <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center">
                                            <item.icon size={20} color="#00704b" />
                                        </View>
                                        <Text className="flex-1 font-bold text-foreground">{item.label}</Text>
                                        {item.value ? (
                                            <Text className="text-xs text-muted-foreground font-medium">{item.value}</Text>
                                        ) : (
                                            <ChevronRight size={20} color="#9ca3af" />
                                        )}
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    ))}

                    {/* Danger Zone */}
                    <View className="gap-2 mb-10">
                        <Pressable className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                            <View className="w-10 h-10 rounded-xl bg-red-500/10 items-center justify-center">
                                <LogOut size={20} color="#ef4444" />
                            </View>
                            <Text className="flex-1 font-bold text-red-500">Sair da conta</Text>
                        </Pressable>

                        <Pressable className="flex-row items-center gap-4 p-4 bg-card rounded-2xl border border-destructive/20">
                            <View className="w-10 h-10 rounded-xl bg-destructive/10 items-center justify-center">
                                <Trash2 size={20} color="#ef4444" />
                            </View>
                            <Text className="flex-1 font-bold text-destructive">Excluir conta</Text>
                        </Pressable>
                    </View>

                    <Text className="text-center text-[10px] text-muted-foreground mb-10 font-bold uppercase tracking-widest">NotaPoint v1.0.0 • Feito com ❤️ no Brasil</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
