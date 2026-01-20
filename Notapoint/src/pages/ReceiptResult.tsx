import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, MapPin, Calendar, ChevronRight, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileLayout } from "@/components/layout/MobileLayout";

const mockItems = [
  { name: "Arroz Tio João 5kg", quantity: 1, price: 24.90 },
  { name: "Feijão Carioca 1kg", quantity: 2, price: 7.49 },
  { name: "Óleo de Soja Liza 900ml", quantity: 1, price: 5.99 },
  { name: "Açúcar União 1kg", quantity: 1, price: 4.79 },
  { name: "Café Pilão 500g", quantity: 1, price: 14.90 },
  { name: "Leite Integral Italac 1L", quantity: 3, price: 4.99 },
];

export default function ReceiptResult() {
  const navigate = useNavigate();
  const total = mockItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleConfirm = () => {
    navigate("/");
  };
  
  return (
    <MobileLayout hideNav>
      <div className="min-h-screen bg-background">
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-primary px-6 pt-12 pb-8 rounded-b-3xl"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4"
            >
              <Check className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">
              Nota registrada!
            </h1>
            <p className="text-primary-foreground/80">
              Seus preços ajudam toda a comunidade
            </p>
          </div>
        </motion.div>
        
        {/* Store Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 -mt-4 bg-card rounded-2xl p-4 shadow-md border border-border/50"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Supermercado BomPreço</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="w-3 h-3" />
                <span>Av. Brasil, 1234 - Centro</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <Calendar className="w-3 h-3" />
                <span>Hoje, 14:32</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Items List */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Itens da compra ({mockItems.length})
          </h2>
          
          <div className="space-y-3">
            {mockItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                </div>
                <p className="font-semibold text-foreground">
                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t-2 border-primary/20 flex justify-between items-center"
          >
            <span className="text-lg font-bold text-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
          </motion.div>
        </div>
        
        {/* Actions */}
        <div className="p-4 pb-8">
          <Button onClick={handleConfirm} variant="scanner" className="group">
            Confirmar e salvar
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
