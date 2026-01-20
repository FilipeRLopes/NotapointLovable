import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScannerView } from "@/components/scanner/ScannerView";

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  
  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      navigate("/receipt-result");
    }, 2000);
  };
  
  return (
    <div className="h-screen flex flex-col bg-foreground max-w-md mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 max-w-md mx-auto"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Zap className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Image className="w-6 h-6" />
          </Button>
        </div>
      </motion.div>
      
      {/* Scanner */}
      <div className="flex-1">
        <ScannerView isScanning={isScanning} onScan={handleScan} />
      </div>
      
      {/* Bottom Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 pb-10"
      >
        <Button 
          onClick={handleScan} 
          disabled={isScanning}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground text-lg font-semibold shadow-lg"
        >
          {isScanning ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
              Escaneando...
            </span>
          ) : (
            "Escanear Nota Fiscal"
          )}
        </Button>
      </motion.div>
    </div>
  );
}
