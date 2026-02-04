import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ShoppingCart, Package, Navigation } from "lucide-react";
import FictionalMap from "@/components/map/FictionalMap";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptimizedRouteDrawer } from "@/components/map/OptimizedRouteDrawer";

interface CartItem {
  id: number;
  name: string;
  bestPrice: number;
  bestStore: string;
  checked: boolean;
}

interface Store {
  id: number;
  name: string;
  distance: string;
  address: string;
  lat: number;
  lng: number;
  prices: { itemId: number; price: number }[];
}

interface StoreMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
}

// Mock data for stores
const mockStores: Store[] = [
  {
    id: 1,
    name: "Atacadão Centro",
    distance: "1.2 km",
    address: "Av. Brasil, 1500",
    lat: -23.55052,
    lng: -46.633308,
    prices: [
      { itemId: 1, price: 22.90 },
      { itemId: 2, price: 7.49 },
      { itemId: 3, price: 6.29 },
    ],
  },
  {
    id: 2,
    name: "BomPreço",
    distance: "2.1 km",
    address: "Rua das Flores, 320",
    lat: -23.5489,
    lng: -46.6388,
    prices: [
      { itemId: 1, price: 24.90 },
      { itemId: 2, price: 6.99 },
      { itemId: 3, price: 5.99 },
    ],
  },
  {
    id: 3,
    name: "Extra Hiper",
    distance: "3.5 km",
    address: "Av. Paulista, 900",
    lat: -23.5505,
    lng: -46.6333,
    prices: [
      { itemId: 1, price: 23.50 },
      { itemId: 2, price: 7.29 },
      { itemId: 3, price: 5.49 },
    ],
  },
  {
    id: 4,
    name: "Carrefour",
    distance: "4.2 km",
    address: "Rua Augusta, 1200",
    lat: -23.5520,
    lng: -46.6400,
    prices: [
      { itemId: 1, price: 21.90 },
      { itemId: 2, price: 7.99 },
      { itemId: 3, price: 6.49 },
    ],
  },
];

export function StoreMapDialog({ open, onOpenChange, cartItems }: StoreMapDialogProps) {
  const [selectedTab, setSelectedTab] = useState<"single" | "combo">("single");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [routeDrawerOpen, setRouteDrawerOpen] = useState(false);

  // Calculate total for each store
  const storesWithTotals = mockStores.map((store) => {
    const total = cartItems.reduce((sum, item) => {
      const storePrice = store.prices.find((p) => p.itemId === item.id);
      return sum + (storePrice?.price || item.bestPrice);
    }, 0);
    return { ...store, total };
  }).sort((a, b) => a.total - b.total);

  // Find best combo (best price for each item across stores)
  const bestCombo = cartItems.map((item) => {
    let bestPrice = Infinity;
    let bestStore = mockStores[0];
    
    mockStores.forEach((store) => {
      const storePrice = store.prices.find((p) => p.itemId === item.id);
      if (storePrice && storePrice.price < bestPrice) {
        bestPrice = storePrice.price;
        bestStore = store;
      }
    });
    
    return {
      item,
      store: bestStore,
      price: bestPrice === Infinity ? item.bestPrice : bestPrice,
    };
  });

  const comboTotal = bestCombo.reduce((sum, b) => sum + b.price, 0);
  const singleBestTotal = storesWithTotals[0]?.total || 0;
  const savings = singleBestTotal - comboTotal;

  // Group combo items by store
  const comboByStore = bestCombo.reduce((acc, curr) => {
    const storeId = curr.store.id;
    if (!acc[storeId]) {
      acc[storeId] = { store: curr.store, items: [], total: 0 };
    }
    acc[storeId].items.push({ name: curr.item.name, price: curr.price });
    acc[storeId].total += curr.price;
    return acc;
  }, {} as Record<number, { store: Store; items: { name: string; price: number }[]; total: number }>);

  // Prepare route stores for the optimized route drawer
  const routeStores = Object.values(comboByStore).map(group => ({
    id: group.store.id,
    name: group.store.name,
    distance: group.store.distance,
    address: group.store.address,
    items: group.items,
    total: group.total,
  }));

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader className="pb-2 border-b border-border/50">
          <DrawerTitle className="text-xl font-bold">Onde Comprar</DrawerTitle>
        </DrawerHeader>

        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "single" | "combo")} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-4 mt-2 grid grid-cols-2 bg-muted/50">
            <TabsTrigger value="single" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Um só lugar
            </TabsTrigger>
            <TabsTrigger value="combo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="w-4 h-4 mr-2" />
              Combo inteligente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="flex-1 overflow-auto m-0 p-4 pt-2 space-y-4">
            {/* Fictional Map */}
            <FictionalMap
              stores={storesWithTotals.map((store, index) => ({
                id: String(store.id),
                name: store.name,
                distance: store.distance,
                position: { 
                  x: 20 + (index * 20) % 60, 
                  y: 25 + (index % 3) * 25 
                },
                isSelected: selectedStore?.id === store.id,
                totalPrice: store.total,
              }))}
              onSelectStore={(id) => {
                const store = storesWithTotals.find(s => String(s.id) === id);
                if (store) setSelectedStore(store);
              }}
              selectedStoreId={selectedStore ? String(selectedStore.id) : undefined}
            />

            {/* Store list */}
            <div className="space-y-3">
              <AnimatePresence>
                {storesWithTotals.map((store, index) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      index === 0
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border/50 hover:border-primary/30"
                    }`}
                    onClick={() => setSelectedStore(store)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{store.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Navigation className="w-3 h-3" />
                            {store.distance} • {store.address}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${index === 0 ? "text-primary" : "text-foreground"}`}>
                          R$ {store.total.toFixed(2).replace(".", ",")}
                        </p>
                        {index === 0 && (
                          <span className="text-xs text-primary font-medium">Mais barato</span>
                        )}
                      </div>
                    </div>

                    {/* Item prices detail */}
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {cartItems.slice(0, 4).map((item) => {
                          const storePrice = store.prices.find((p) => p.itemId === item.id);
                          const price = storePrice?.price || item.bestPrice;
                          const isBest = price === Math.min(...mockStores.map(s => s.prices.find(p => p.itemId === item.id)?.price || Infinity));
                          return (
                            <div key={item.id} className="flex justify-between">
                              <span className="text-muted-foreground truncate">{item.name}</span>
                              <span className={isBest ? "text-primary font-medium" : "text-foreground"}>
                                R$ {price.toFixed(2).replace(".", ",")}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="combo" className="flex-1 overflow-auto m-0 p-4 pt-2 space-y-4">
            {/* Savings banner */}
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-4 mb-4 border border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Economia comprando em lugares diferentes</p>
                    <p className="text-2xl font-bold text-primary">
                      R$ {savings.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total combo</p>
                    <p className="text-lg font-semibold text-foreground">
                      R$ {comboTotal.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Combo breakdown by store */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {Object.values(comboByStore).map((group, index) => (
                <motion.div
                  key={group.store.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border/50 overflow-hidden"
                >
                  <div className="p-4 bg-muted/30 border-b border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{group.store.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            {group.store.distance}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          R$ {group.total.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {group.items.length} {group.items.length === 1 ? "item" : "itens"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {group.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{item.name}</span>
                        <span className="text-primary font-medium">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Route button */}
            <Button 
              variant="accent" 
              className="w-full mt-4 h-12 rounded-xl"
              onClick={() => setRouteDrawerOpen(true)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Ver rota otimizada
            </Button>
          </TabsContent>
        </Tabs>

        <OptimizedRouteDrawer
          open={routeDrawerOpen}
          onOpenChange={setRouteDrawerOpen}
          stores={routeStores}
          totalSavings={savings}
        />
      </DrawerContent>
    </Drawer>
  );
}
