import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceUpdateDate } from "@/lib/formatDate";
import { useNavigate } from "react-router-dom";
import { DealDetailDrawer, Deal } from "@/components/deals/DealDetailDrawer";

interface DealProps {
  product: string;
  image: string;
  originalPrice: number;
  dealPrice: number;
  store: string;
  expiresIn?: string;
  updatedAt?: Date;
  onClick?: () => void;
}

function DealCard({ product, image, originalPrice, dealPrice, store, expiresIn, updatedAt = new Date(), onClick }: DealProps) {
  const discount = Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
  
  return (
    <div 
      className="min-w-[180px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-3 border border-accent/20 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative w-full h-24 rounded-xl overflow-hidden mb-3 bg-secondary">
        <img 
          src={image} 
          alt={product} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 text-xs font-medium text-accent-foreground bg-accent px-2 py-0.5 rounded-full flex items-center gap-0.5">
          <Sparkles className="w-2.5 h-2.5" />
          -{discount}%
        </span>
      </div>
      
      <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2 leading-tight">{product}</h4>
      <p className="text-xs text-muted-foreground mb-2">{store}</p>
      
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-primary">
          R$ {dealPrice.toFixed(2).replace(".", ",")}
        </span>
        <span className="text-xs text-muted-foreground line-through">
          R$ {originalPrice.toFixed(2).replace(".", ",")}
        </span>
      </div>
      
      {expiresIn && (
        <p className="text-xs text-accent mt-1">Expira em {expiresIn}</p>
      )}
      
      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
        <Clock className="w-2.5 h-2.5" />
        <span>Atualizado em {formatPriceUpdateDate(updatedAt)}</span>
      </div>
    </div>
  );
}

const deals: Deal[] = [
  { 
    product: "Leite Integral 1L", 
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    originalPrice: 6.99, 
    dealPrice: 4.49, 
    store: "Atacadão", 
    expiresIn: "2h",
    updatedAt: new Date(Date.now() - 1800000),
  },
  { 
    product: "Café Pilão 500g", 
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
    originalPrice: 18.90, 
    dealPrice: 12.90, 
    store: "Carrefour", 
    expiresIn: "5h",
    updatedAt: new Date(Date.now() - 3600000),
  },
  { 
    product: "Óleo de Soja 900ml", 
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
    originalPrice: 8.99, 
    dealPrice: 5.99, 
    store: "Extra", 
    expiresIn: "1 dia",
    updatedAt: new Date(Date.now() - 7200000),
  },
];

export function RecentDeals() {
  const navigate = useNavigate();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setDrawerOpen(true);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Ofertas em destaque</h2>
          <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/deals")}>
            Ver todas <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {deals.map((deal, i) => (
            <DealCard key={i} {...deal} onClick={() => handleDealClick(deal)} />
          ))}
        </div>
      </motion.div>

      <DealDetailDrawer 
        deal={selectedDeal} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </>
  );
}
