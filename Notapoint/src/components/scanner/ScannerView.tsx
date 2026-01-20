import { motion } from "framer-motion";
import { ScanLine, Zap } from "lucide-react";

interface ScannerViewProps {
  isScanning?: boolean;
  onScan?: () => void;
}

export function ScannerView({ isScanning = false, onScan }: ScannerViewProps) {
  return (
    <div className="relative h-full w-full bg-foreground/95 flex flex-col items-center justify-center overflow-hidden">
      {/* Simulated camera background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/60" />
      
      {/* Scanner frame */}
      <div className="relative w-72 h-72" onClick={onScan}>
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-primary rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-primary rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-primary rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-primary rounded-br-2xl" />
        
        {/* Scanning line */}
        {isScanning && (
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full shadow-glow"
          />
        )}
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ScanLine className="w-10 h-10 text-primary-foreground" />
          </motion.div>
        </div>
      </div>
      
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center"
      >
        <p className="text-primary-foreground/90 text-lg font-medium mb-2">
          {isScanning ? "Processando..." : "Aponte para o QR Code"}
        </p>
        <p className="text-primary-foreground/60 text-sm">
          da sua nota fiscal
        </p>
      </motion.div>
      
      {/* Flash hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-32 flex items-center gap-2 text-primary-foreground/60"
      >
        <Zap className="w-4 h-4" />
        <span className="text-sm">Toque para ativar flash</span>
      </motion.div>
    </div>
  );
}
