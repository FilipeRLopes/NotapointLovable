import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OnboardingStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
}

export function OnboardingStep({ icon: Icon, title, description, step, totalSteps }: OnboardingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center px-8"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-150" />
        <div className="relative w-32 h-32 gradient-primary rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-xs">
        {description}
      </p>
      
      <div className="flex gap-2 mt-12">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
