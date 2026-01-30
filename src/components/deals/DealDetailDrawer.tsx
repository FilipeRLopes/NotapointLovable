import { MapPin, Clock, ExternalLink, ShoppingCart, Sparkles, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatPriceUpdateDate } from "@/lib/formatDate";

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
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2 border-b border-border/50">
          <DrawerTitle className="text-xl font-bold">Detalhes da Oferta</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 overflow-y-auto">
          {/* Product Image */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-secondary">
            <img 
              src={deal.image} 
              alt={deal.product} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              -{discount}%
            </div>
          </div>

          {/* Product Info */}
          <h2 className="text-xl font-bold text-foreground mb-2">{deal.product}</h2>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span>{deal.store}</span>
            {deal.distance && (
              <>
                <span className="text-border">•</span>
                <span>{deal.distance}</span>
              </>
            )}
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 mb-4 border border-primary/20">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-sm text-muted-foreground">Preço promocional</span>
                <div className="text-3xl font-bold text-primary">
                  R$ {deal.dealPrice.toFixed(2).replace(".", ",")}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full bg-success/10 text-success">
                <TrendingDown className="w-4 h-4" />
                {discount}% OFF
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Preço original: <span className="line-through">R$ {deal.originalPrice.toFixed(2).replace(".", ",")}</span>
              </span>
              <span className="font-semibold text-success">
                Economia de R$ {savings.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* Expiration & Update Info */}
          <div className="flex flex-col gap-2 mb-6">
            {deal.expiresIn && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                  ⏳ Expira em {deal.expiresIn}
                </span>
              </div>
            )}
            {deal.updatedAt && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Preço atualizado em {formatPriceUpdateDate(deal.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 h-12 rounded-xl gradient-primary" onClick={() => onOpenChange(false)}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar à Lista
            </Button>
            <Button variant="outline" className="h-12 rounded-xl px-4">
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
