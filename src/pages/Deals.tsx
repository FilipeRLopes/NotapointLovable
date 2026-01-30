import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Sparkles, TrendingDown, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { formatPriceUpdateDate } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import { DealDetailDrawer, Deal } from "@/components/deals/DealDetailDrawer";

interface DealWithDistance extends Deal {
  id: number;
  distance: string;
}

const allDeals: DealWithDistance[] = [
  {
    id: 1,
    product: "Leite Integral Piracanjuba 1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    originalPrice: 6.99,
    dealPrice: 4.49,
    store: "Atacadão",
    distance: "1.2km",
    expiresIn: "2h",
    updatedAt: new Date(Date.now() - 1800000),
  },
  {
    id: 2,
    product: "Café Pilão 500g",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
    originalPrice: 18.90,
    dealPrice: 12.90,
    store: "Carrefour",
    distance: "2.1km",
    expiresIn: "5h",
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 3,
    product: "Óleo de Soja Soya 900ml",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
    originalPrice: 8.99,
    dealPrice: 5.99,
    store: "Extra",
    distance: "800m",
    expiresIn: "1 dia",
    updatedAt: new Date(Date.now() - 7200000),
  },
  {
    id: 4,
    product: "Arroz Tio João 5kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    originalPrice: 28.50,
    dealPrice: 22.90,
    store: "Atacadão",
    distance: "1.2km",
    expiresIn: "3h",
    updatedAt: new Date(Date.now() - 900000),
  },
  {
    id: 5,
    product: "Feijão Carioca Camil 1kg",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=200&h=200&fit=crop",
    originalPrice: 9.49,
    dealPrice: 6.99,
    store: "BomPreço",
    distance: "1.5km",
    expiresIn: "6h",
    updatedAt: new Date(Date.now() - 5400000),
  },
  {
    id: 6,
    product: "Açúcar União 1kg",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop",
    originalPrice: 5.99,
    dealPrice: 4.29,
    store: "Carrefour",
    distance: "2.1km",
    expiresIn: "4h",
    updatedAt: new Date(Date.now() - 2700000),
  },
  {
    id: 7,
    product: "Macarrão Espaguete Barilla 500g",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop",
    originalPrice: 7.99,
    dealPrice: 5.49,
    store: "Pão de Açúcar",
    distance: "3.0km",
    expiresIn: "12h",
    updatedAt: new Date(Date.now() - 4500000),
  },
  {
    id: 8,
    product: "Sabonete Dove 90g",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=200&h=200&fit=crop",
    originalPrice: 4.99,
    dealPrice: 2.99,
    store: "Drogasil",
    distance: "500m",
    expiresIn: "8h",
    updatedAt: new Date(Date.now() - 1200000),
  },
];

export default function Deals() {
  const navigate = useNavigate();
  const [deals] = useState(allDeals);
  const [selectedDeal, setSelectedDeal] = useState<DealWithDistance | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDealClick = (deal: DealWithDistance) => {
    setSelectedDeal(deal);
    setDrawerOpen(true);
  };

  return (
    <MobileLayout hideNav>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Ofertas em Destaque</h1>
              <p className="text-sm text-muted-foreground">{deals.length} ofertas disponíveis</p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Deals Grid */}
        <div className="space-y-3">
          {deals.map((deal, index) => {
            const discount = Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100);
            
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]"
                onClick={() => handleDealClick(deal)}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={deal.image} 
                      alt={deal.product} 
                      className="w-full h-full object-cover" 
                    />
                    {/* Discount Badge */}
                    <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      -{discount}%
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate mb-1">{deal.product}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-primary">
                        R$ {deal.dealPrice.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-success/10 text-success">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {discount}%
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{deal.store}</span>
                      <span className="text-border">•</span>
                      <span>{deal.distance}</span>
                    </div>
                  </div>
                </div>
                
                {/* Price comparison and expiration */}
                <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">De</span>
                    <span className="text-muted-foreground line-through">
                      R$ {deal.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  {deal.expiresIn && (
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                      Expira em {deal.expiresIn}
                    </span>
                  )}
                </div>
                
                {/* Price update info */}
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Preço atualizado em {formatPriceUpdateDate(deal.updatedAt)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <DealDetailDrawer 
        deal={selectedDeal} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </MobileLayout>
  );
}
