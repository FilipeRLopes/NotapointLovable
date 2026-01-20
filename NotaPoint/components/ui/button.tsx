import * as React from "react"
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "flex-row items-center justify-center rounded-xl",
    {
        variants: {
            variant: {
                default: "bg-primary",
                destructive: "bg-destructive",
                outline: "border border-input bg-background",
                secondary: "bg-secondary",
                ghost: "",
                link: "",
                gradient: "bg-primary", // Fallback to primary color for now
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-10 px-4",
                lg: "h-14 px-8",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
    label?: string;
    textClass?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
    ({ className, variant, size, label, children, textClass, ...props }, ref) => {
        return (
            <TouchableOpacity
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                activeOpacity={0.8}
                {...props}
            >
                {label ? (
                    <Text className={cn(
                        "font-medium tracking-wide",
                        variant === 'outline' || variant === 'ghost' ? "text-foreground" : "text-primary-foreground",
                        textClass
                    )}>
                        {label}
                    </Text>
                ) : (
                    children
                )}
            </TouchableOpacity>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
