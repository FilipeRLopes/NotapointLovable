import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, Info, ChevronDown, ChevronUp, Receipt, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PriceHistory {
  date: string;
  price: number;
  store: string;
}

interface ProductInflation {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  priceHistory: PriceHistory[];
  taxPercentage: number;
  taxAmount: number;
}

interface InflationTrackerProps {
  products: ProductInflation[];
}

const InflationTracker = ({ products }: InflationTrackerProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const calculateInflation = (product: ProductInflation, days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const relevantHistory = product.priceHistory
      .filter(h => new Date(h.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (relevantHistory.length < 2) return { percentage: 0, absoluteChange: 0 };
    
    const oldPrice = relevantHistory[0].price;
    const newPrice = relevantHistory[relevantHistory.length - 1].price;
    
    const absoluteChange = newPrice - oldPrice;
    const percentage = ((newPrice - oldPrice) / oldPrice) * 100;
    
    return { percentage, absoluteChange };
  };

  const getTotalTaxes = () => {
    return products.reduce((sum, p) => sum + p.taxAmount, 0);
  };

  const getTotalInflation = () => {
    const totalOld = products.reduce((sum, p) => {
      const history = p.priceHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return sum + (history[0]?.price || p.currentPrice);
    }, 0);
    
    const totalNew = products.reduce((sum, p) => sum + p.currentPrice, 0);
    
    return ((totalNew - totalOld) / totalOld) * 100;
  };

  return (
    <div className="space-y-4">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Período de análise</span>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
            <SelectItem value="180">Últimos 6 meses</SelectItem>
            <SelectItem value="365">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          className="bg-card border border-border rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Impostos estimados</span>
          </div>
          <p className="text-xl font-bold text-foreground">
            R$ {getTotalTaxes().toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ~{((getTotalTaxes() / products.reduce((s, p) => s + p.currentPrice, 0)) * 100).toFixed(1)}% do total
          </p>
        </motion.div>

        <motion.div 
          className="bg-card border border-border rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            {getTotalInflation() >= 0 ? (
              <TrendingUp className="w-4 h-4 text-destructive" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-500" />
            )}
            <span className="text-xs text-muted-foreground">Variação total</span>
          </div>
          <p className={`text-xl font-bold ${getTotalInflation() >= 0 ? 'text-destructive' : 'text-green-500'}`}>
            {getTotalInflation() >= 0 ? '+' : ''}{getTotalInflation().toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            nos últimos {selectedPeriod} dias
          </p>
        </motion.div>
      </div>

      {/* Product list */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Receipt className="w-4 h-4" />
          Histórico por produto
        </h4>

        {products.map((product) => {
          const inflation = calculateInflation(product, parseInt(selectedPeriod));
          const isExpanded = expandedProduct === product.id;
          
          return (
            <motion.div
              key={product.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
              layout
            >
              <button
                className="w-full p-3 flex items-center gap-3"
                onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
              >
                {/* Product image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product info */}
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Atual: R$ {product.currentPrice.toFixed(2)}
                  </p>
                </div>

                {/* Inflation indicator */}
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    inflation.percentage > 0 
                      ? 'bg-destructive/10 text-destructive' 
                      : inflation.percentage < 0 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {inflation.percentage > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : inflation.percentage < 0 ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    {inflation.percentage > 0 ? '+' : ''}{inflation.percentage.toFixed(1)}%
                  </div>
                  
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    <div className="p-3 space-y-3">
                      {/* Tax info */}
                      <div className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Impostos embutidos</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-[200px]">
                                  Estimativa baseada na média de impostos sobre produtos de consumo no Brasil (ICMS, PIS, COFINS)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          R$ {product.taxAmount.toFixed(2)} ({product.taxPercentage}%)
                        </span>
                      </div>

                      {/* Price history */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Histórico de preços (mesmo estabelecimento)
                        </p>
                        
                        {product.priceHistory
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .slice(0, 5)
                          .map((history, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {new Date(history.date).toLocaleDateString('pt-BR')}
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground truncate max-w-[100px]">
                                  {history.store}
                                </span>
                              </div>
                              <span className="font-medium text-foreground">
                                R$ {history.price.toFixed(2)}
                              </span>
                            </div>
                          ))}
                      </div>

                      {/* Price change summary */}
                      {inflation.absoluteChange !== 0 && (
                        <div className={`text-xs p-2 rounded-lg ${
                          inflation.absoluteChange > 0 
                            ? 'bg-destructive/10 text-destructive' 
                            : 'bg-green-500/10 text-green-500'
                        }`}>
                          {inflation.absoluteChange > 0 ? (
                            <>Esse produto subiu R$ {inflation.absoluteChange.toFixed(2)} nos últimos {selectedPeriod} dias</>
                          ) : (
                            <>Esse produto baixou R$ {Math.abs(inflation.absoluteChange).toFixed(2)} nos últimos {selectedPeriod} dias</>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InflationTracker;
