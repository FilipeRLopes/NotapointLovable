// @ts-nocheck
import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils'; // Assuming this utility exists based on previous file views

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    let bgClass = 'bg-primary';
    let textClass = 'text-primary-foreground';
    let borderClass = '';

    switch (variant) {
        case 'secondary':
            bgClass = 'bg-secondary';
            textClass = 'text-secondary-foreground';
            break;
        case 'outline':
            bgClass = 'bg-transparent';
            textClass = 'text-foreground';
            borderClass = 'border border-border';
            break;
        case 'destructive':
            bgClass = 'bg-destructive';
            textClass = 'text-destructive-foreground';
            break;
    }

    return (
        <View className={cn("px-2.5 py-0.5 rounded-full flex-row items-center", bgClass, borderClass, className)}>
            <Text className={cn("text-xs font-semibold", textClass)}>
                {children}
            </Text>
        </View>
    );
}
