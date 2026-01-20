// @ts-nocheck
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cn } from '@/lib/utils';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface TabsProps {
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string; icon?: React.ElementType }[];
}

export function Tabs({ value, onValueChange, options }: TabsProps) {
    return (
        <View className="flex-row bg-muted/30 p-1 rounded-xl mb-4">
            {options.map((option) => {
                const isActive = value === option.value;
                const Icon = option.icon;

                return (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => onValueChange(option.value)}
                        className={cn(
                            "flex-1 flex-row items-center justify-center py-2.5 rounded-lg gap-2 transition-all",
                            isActive ? "bg-background shadow-sm" : ""
                        )}
                        activeOpacity={0.8}
                    >
                        {Icon && <Icon size={14} color={isActive ? "#000000" : "#64748B"} />}
                        <Text className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
