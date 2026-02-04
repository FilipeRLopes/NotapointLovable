import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Car, Footprints, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";

interface RouteStore {
  id: number;
  name: string;
  distance: string;
  address: string;
  items: { name: string; price: number }[];
  total: number;
}

interface OptimizedRouteDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stores: RouteStore[];
  totalSavings: number;
}

export function OptimizedRouteDrawer({ 
  open, 
  onOpenChange, 
  stores,
  totalSavings 
}: OptimizedRouteDrawerProps) {
  // Calculate total route distance (mock)
  const totalDistance = stores.reduce((sum, store) => {
    const dist = parseFloat(store.distance.replace(" km", "").replace(",", "."));
    return sum + dist;
  }, 0);
  
  // Estimate time (mock: 3 min per km by car, 12 min per km walking)
  const carTime = Math.round(totalDistance * 3);
  const walkTime = Math.round(totalDistance * 12);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] bg-background border-t-0 rounded-t-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div>
            <h2 className="text-xl font-bold text-foreground">Rota Otimizada</h2>
            <p className="text-sm text-muted-foreground">{stores.length} paradas</p>
          </div>
          <DrawerClose asChild>
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </DrawerClose>
        </div>

        {/* Map with route */}
        <div className="mx-4 relative h-48 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl overflow-hidden border border-border">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
          
          {/* Route path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
            {/* Dashed route line connecting stores */}
            <motion.path 
              d="M 150 90 Q 80 60 60 50 Q 40 80 80 120 Q 120 140 200 100 Q 240 80 220 50"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="8 4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Animated dot along path */}
            <motion.circle
              r="5"
              fill="hsl(var(--primary))"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: "path('M 150 90 Q 80 60 60 50 Q 40 80 80 120 Q 120 140 200 100 Q 240 80 220 50')" }}
            />
          </svg>
          
          {/* User location (center) */}
          <motion.div 
            className="absolute z-20"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute bg-primary/30 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 32, height: 32, marginLeft: -8, marginTop: -8 }}
              />
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg" />
            </div>
          </motion.div>
          
          {/* Store markers with numbers */}
          {stores.map((store, index) => {
            const positions = [
              { x: 20, y: 28 },
              { x: 27, y: 67 },
              { x: 67, y: 55 },
              { x: 73, y: 28 },
            ];
            const pos = positions[index] || { x: 50, y: 50 };
            
            return (
              <motion.div
                key={store.id}
                className="absolute z-10"
                style={{ 
                  left: `${pos.x}%`, 
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -100%)'
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 border-background">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1.5 text-xs border border-border flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-foreground">Início</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[8px] font-bold text-accent-foreground">1</div>
              <span className="text-foreground">Paradas</span>
            </div>
          </div>
        </div>

        {/* Time estimates */}
        <div className="mx-4 mt-3 flex gap-2">
          <div className="flex-1 bg-secondary/50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">De carro</p>
              <p className="font-semibold text-foreground">~{carTime} min</p>
            </div>
          </div>
          <div className="flex-1 bg-secondary/50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Footprints className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">A pé</p>
              <p className="font-semibold text-foreground">~{walkTime} min</p>
            </div>
          </div>
        </div>

        {/* Route steps */}
        <div className="p-4 pb-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">ORDEM DE PARADAS</h3>
          <div className="space-y-0">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < stores.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-8 bg-border" />
                )}
                
                <div className="flex items-start gap-3 pb-4">
                  {/* Step number */}
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  
                  {/* Store info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground truncate">{store.name}</h4>
                      <span className="text-xs text-muted-foreground ml-2">{store.distance}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{store.address}</p>
                    
                    {/* Items to buy */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {store.items.map((item, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-primary">
                      R$ {store.total.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Savings summary */}
        <div className="mx-4 mb-4 bg-gradient-to-r from-success/10 to-success/5 rounded-xl p-3 border border-success/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground">Distância total: {totalDistance.toFixed(1)} km</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-success">
                Economia: R$ {totalSavings.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="px-4 pb-6">
          <Button 
            className="w-full h-14 rounded-2xl text-base font-semibold gradient-primary shadow-lg"
            onClick={() => onOpenChange(false)}
          >
            <Navigation className="w-5 h-5 mr-2" />
            Iniciar navegação
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
