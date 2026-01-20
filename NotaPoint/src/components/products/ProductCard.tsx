import { motion } from "framer-motion";
import { Clock, MapPin, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPriceUpdateDate } from "@/lib/formatDate";

interface ProductCardProps {
  name: string;
  image?: string;
  lowestPrice: number;
  averagePrice: number;
  store: string;
  distance: string;
  trend?: "up" | "down";
  delay?: number;
  updatedAt?: Date;
}

export function ProductCard({
  name,
  image,
  lowestPrice,
  averagePrice,
  store,
  distance,
  trend,
  delay = 0,
  updatedAt = new Date(),
}: ProductCardProps) {
  const savings = ((averagePrice - lowestPrice) / averagePrice) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.3 }}
      className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-12 h-12 bg-muted rounded-lg" />
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate mb-1">{name}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-primary">
              R$ {lowestPrice.toFixed(2).replace(".", ",")}
            </span>
            {trend && (
              <span className={cn(
                "flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
                trend === "down" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}>
                {trend === "down" ? (
                  <TrendingDown className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingUp className="w-3 h-3 mr-1" />
                )}
                {savings.toFixed(0)}%
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{store}</span>
            <span className="text-border">•</span>
            <span>{distance}</span>
          </div>
        </div>
      </div>
      
      {/* Average price comparison */}
      <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Média na cidade</span>
        <span className="text-muted-foreground line-through">
          R$ {averagePrice.toFixed(2).replace(".", ",")}
        </span>
      </div>
      
      {/* Price update info */}
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        <span>Preço atualizado em {formatPriceUpdateDate(updatedAt)}</span>
      </div>
    </motion.div>
  );
}
