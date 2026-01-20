import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, TrendingDown, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingStep } from "@/components/onboarding/OnboardingStep";

const steps = [
  {
    icon: ScanLine,
    title: "Escaneie suas notas",
    description: "Aponte a câmera para o QR Code da nota fiscal e registre seus preços automaticamente.",
  },
  {
    icon: TrendingDown,
    title: "Compare preços",
    description: "Descubra onde encontrar os melhores preços na sua cidade em tempo real.",
  },
  {
    icon: Bell,
    title: "Receba alertas",
    description: "Seja notificado quando os produtos que você compra ficarem mais baratos.",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("onboarding_complete", "true");
      navigate("/");
    }
  };
  
  const handleSkip = () => {
    localStorage.setItem("onboarding_complete", "true");
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <ScanLine className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">NotaPoint</span>
        </motion.div>
        
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Pular
        </Button>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          <OnboardingStep
            key={currentStep}
            {...steps[currentStep]}
            step={currentStep}
            totalSteps={steps.length}
          />
        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <div className="p-6 pb-10">
        <Button onClick={handleNext} variant="scanner" className="group">
          {currentStep === steps.length - 1 ? "Começar" : "Continuar"}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
