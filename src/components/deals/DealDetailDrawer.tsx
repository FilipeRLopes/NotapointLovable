import { MapPin, Clock, ShoppingCart, ArrowRight, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { formatPriceUpdateDate } from "@/lib/formatDate";
import { motion } from "framer-motion";

export interface Deal {
  id?: number;
  product: string;
  image: string;
  originalPrice: number;
  dealPrice: number;
  store: string;
  distance?: string;
  expiresIn?: string;
  updatedAt?: Date;
}

interface DealDetailDrawerProps {
  deal: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DealDetailDrawer({ deal, open, onOpenChange }: DealDetailDrawerProps) {
  if (!deal) return null;
  
  const discount = Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100);
  const savings = deal.originalPrice - deal.dealPrice;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] bg-background border-t-0 rounded-t-3xl overflow-hidden">
        {/* Header with Close Button */}
        <div className="flex items-center justify-end p-4 pb-0">
          <DrawerClose asChild>
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </DrawerClose>
        </div>

        {/* Product Image Section - Square layout for catalog images */}
        <div className="relative px-4">
          <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
            {/* Subtle background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-3xl" />
            
            <img 
              src={deal.image} 
              alt={deal.product} 
              className="relative z-10 w-full h-full object-contain p-2"
            />
            
            {/* Discount Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-2 z-20"
            >
              <div className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                -{discount}%
              </div>
            </motion.div>
          </div>
          {/* Price Card */}
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-4"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Preço promocional</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      R$ {deal.dealPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {deal.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
                <div className="text-right bg-success/10 px-3 py-2 rounded-xl">
                  <p className="text-[10px] text-success/80 mb-0.5">Economia</p>
                  <span className="text-lg font-bold text-success">
                    R$ {savings.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-4 pb-6 overflow-y-auto">
          {/* Product Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-foreground mb-4 leading-tight"
          >
            {deal.product}
          </motion.h2>
          
          {/* Info Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <div className="flex items-center gap-2 bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-xl text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{deal.store}</span>
              {deal.distance && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{deal.distance}</span>
                </>
              )}
            </div>
            
            {deal.expiresIn && (
              <div className="flex items-center gap-2 bg-accent/15 text-accent-foreground px-3 py-2 rounded-xl text-sm">
                <Clock className="w-4 h-4 text-accent" />
                <span className="font-medium">Expira em {deal.expiresIn}</span>
              </div>
            )}
          </motion.div>
          
          {/* Update Info */}
          {deal.updatedAt && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Preço verificado {formatPriceUpdateDate(deal.updatedAt)}</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-3"
          >
            <Button 
              className="w-full h-14 rounded-2xl text-base font-semibold gradient-primary shadow-lg" 
              onClick={() => onOpenChange(false)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar à Lista
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-2xl text-sm font-medium border-2"
              onClick={() => onOpenChange(false)}
            >
              Ver no mapa
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
