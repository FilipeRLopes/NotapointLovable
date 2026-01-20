import React from 'react';
import { Pressable, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl px-4 py-2 transition-all active:scale-95 overflow-hidden',
    {
        variants: {
            variant: {
                default: 'bg-primary',
                destructive: 'bg-destructive',
                outline: 'border border-input bg-background',
                secondary: 'bg-secondary',
                ghost: 'bg-transparent',
                link: 'underline-offset-4 underline',
                gradient: '',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
                xl: 'h-20 px-6',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
    label?: string;
    loading?: boolean;
    textClassName?: string;
}

const Button = React.forwardRef<View, ButtonProps>(
    ({ className, variant, size, label, children, loading, textClassName, ...props }, ref) => {
        const isGradient = variant === 'gradient';

        const content = (
            <View className="flex-row items-center justify-center gap-2 px-4 py-2 w-full h-full">
                {loading && <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? 'black' : 'white'} />}
                {label ? (
                    <Text className={cn(
                        'text-sm font-bold',
                        variant === 'outline' || variant === 'ghost' ? 'text-foreground' : 'text-white',
                        isGradient && 'text-white',
                        textClassName
                    )}>
                        {label}
                    </Text>
                ) : (
                    children
                )}
            </View>
        );

        return (
            <Pressable
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }), loading && 'opacity-70')}
                disabled={loading}
                {...props}
            >
                {isGradient ? (
                    <LinearGradient
                        colors={['hsl(160, 100%, 22%)', 'hsl(160, 80%, 32%)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    >
                        {content}
                    </LinearGradient>
                ) : (
                    content
                )}
            </Pressable>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
