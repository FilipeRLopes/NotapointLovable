import * as React from 'react';
import { TextInput, View, Text } from 'react-native';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.ComponentPropsWithoutRef<typeof TextInput> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
    ({ className, label, error, containerClassName, ...props }, ref) => {
        return (
            <View className={cn('flex flex-col gap-1.5', containerClassName)}>
                {label && (
                    <Text className="text-sm font-medium text-foreground ml-1">
                        {label}
                    </Text>
                )}
                <TextInput
                    ref={ref}
                    className={cn(
                        'flex h-12 w-full rounded-xl border border-input bg-card px-4 py-2 text-base text-foreground focus:border-primary',
                        error && 'border-destructive',
                        className
                    )}
                    placeholderTextColor="hsl(var(--muted-foreground))"
                    {...props}
                />
                {error && (
                    <Text className="text-xs text-destructive ml-1">
                        {error}
                    </Text>
                )}
            </View>
        );
    }
);

Input.displayName = 'Input';

export { Input };
