// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { cn } from '@/lib/utils';

// Simple Select implementation for RN using a Modal
interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
}

export function Select({ value, onValueChange, options, placeholder }: SelectProps) {
    const [open, setOpen] = useState(false);
    const selectedLabel = options.find(o => o.value === value)?.label || placeholder || "Selecione";

    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                className="flex-row items-center justify-between h-12 px-3 bg-card border border-border/50 rounded-xl w-full"
            >
                <Text className="text-foreground">{selectedLabel}</Text>
                <ChevronDown size={16} color="#94A3B8" />
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="fade">
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}
                    activeOpacity={1}
                    onPress={() => setOpen(false)}
                >
                    <View className="bg-background rounded-2xl overflow-hidden shadow-xl max-h-[50%]">
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className={cn(
                                        "p-4 border-b border-border/10 flex-row justify-between items-center",
                                        item.value === value ? "bg-primary/10" : ""
                                    )}
                                    onPress={() => {
                                        onValueChange(item.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Text className={cn("text-base", item.value === value ? "text-primary font-bold" : "text-foreground")}>
                                        {item.label}
                                    </Text>
                                    {item.value === value && <Check size={16} color="#10B981" />}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}
