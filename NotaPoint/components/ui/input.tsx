import * as React from "react"
import { TextInput, TextInputProps, View, Text } from "react-native"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <TextInput
                className={cn(
                    "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                placeholderTextColor="#94A3B8" // muted-foreground
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
