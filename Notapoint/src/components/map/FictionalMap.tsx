import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface Store {
  id: string;
  name: string;
  distance: string;
  position: { x: number; y: number };
  isSelected?: boolean;
  totalPrice?: number;
}

interface FictionalMapProps {
  stores: Store[];
  onSelectStore: (storeId: string) => void;
  selectedStoreId?: string;
}

const FictionalMap = ({ stores, onSelectStore, selectedStoreId }: FictionalMapProps) => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl overflow-hidden border border-border">
      {/* Grid pattern to simulate map */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Simulated streets */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
        {/* Main roads */}
        <path d="M 0 125 L 400 125" stroke="hsl(var(--muted-foreground) / 0.4)" strokeWidth="8" fill="none" />
        <path d="M 200 0 L 200 250" stroke="hsl(var(--muted-foreground) / 0.4)" strokeWidth="8" fill="none" />
        <path d="M 50 0 L 350 250" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="4" fill="none" />
        <path d="M 0 50 L 400 200" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="4" fill="none" />
        
        {/* Secondary roads */}
        <path d="M 100 0 L 100 250" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="3" fill="none" />
        <path d="M 300 0 L 300 250" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="3" fill="none" />
        <path d="M 0 60 L 400 60" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="3" fill="none" />
        <path d="M 0 190 L 400 190" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="3" fill="none" />
      </svg>
      
      {/* User location */}
      <motion.div 
        className="absolute z-20"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <motion.div 
            className="absolute inset-0 bg-primary/30 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 40, height: 40, marginLeft: -12, marginTop: -12 }}
          />
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg" />
        </div>
      </motion.div>
      
      {/* Store markers */}
      {stores.map((store, index) => (
        <motion.button
          key={store.id}
          className="absolute z-10 group"
          style={{ 
            left: `${store.position.x}%`, 
            top: `${store.position.y}%`,
            transform: 'translate(-50%, -100%)'
          }}
          onClick={() => onSelectStore(store.id)}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`relative ${selectedStoreId === store.id ? 'z-20' : ''}`}>
            <MapPin 
              className={`w-8 h-8 drop-shadow-lg transition-colors ${
                selectedStoreId === store.id 
                  ? 'text-primary fill-primary/20' 
                  : 'text-destructive fill-destructive/20'
              }`} 
            />
            
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 
              bg-background border border-border rounded-lg shadow-lg whitespace-nowrap
              text-xs font-medium transition-opacity ${
                selectedStoreId === store.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
              <p className="text-foreground">{store.name}</p>
              <p className="text-muted-foreground">{store.distance}</p>
              {store.totalPrice && (
                <p className="text-primary font-bold">
                  R$ {store.totalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </motion.button>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs border border-border">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-foreground">Você está aqui</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-destructive" />
          <span className="text-foreground">Estabelecimentos</span>
        </div>
      </div>
      
      {/* Compass */}
      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full p-2 border border-border">
        <Navigation className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
};

export default FictionalMap;
