import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

export interface DealFilters {
  stores: string[];
  minDiscount: number;
  maxDistance: number;
  sortBy: "discount" | "distance" | "price" | "expiration";
}

interface DealsFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: DealFilters;
  onApplyFilters: (filters: DealFilters) => void;
  availableStores: string[];
}

const sortOptions = [
  { value: "discount", label: "Maior desconto" },
  { value: "distance", label: "Mais perto" },
  { value: "price", label: "Menor preço" },
  { value: "expiration", label: "Expira primeiro" },
] as const;

export function DealsFilterDrawer({ 
  open, 
  onOpenChange, 
  filters, 
  onApplyFilters,
  availableStores 
}: DealsFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<DealFilters>(filters);

  const handleStoreToggle = (store: string) => {
    setLocalFilters(prev => ({
      ...prev,
      stores: prev.stores.includes(store)
        ? prev.stores.filter(s => s !== store)
        : [...prev.stores, store]
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetFilters: DealFilters = {
      stores: [],
      minDiscount: 0,
      maxDistance: 10,
      sortBy: "discount"
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
    onOpenChange(false);
  };

  const activeFiltersCount = 
    localFilters.stores.length + 
    (localFilters.minDiscount > 0 ? 1 : 0) + 
    (localFilters.maxDistance < 10 ? 1 : 0);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2 border-b border-border/50">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrar Ofertas
            </DrawerTitle>
            {activeFiltersCount > 0 && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativo{activeFiltersCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </DrawerHeader>

        <div className="p-4 overflow-y-auto space-y-6">
          {/* Sort By */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Ordenar por</h3>
            <div className="grid grid-cols-2 gap-2">
              {sortOptions.map(option => (
                <Button
                  key={option.value}
                  variant={localFilters.sortBy === option.value ? "default" : "outline"}
                  className={`h-10 rounded-xl text-sm ${localFilters.sortBy === option.value ? 'gradient-primary' : ''}`}
                  onClick={() => setLocalFilters(prev => ({ ...prev, sortBy: option.value }))}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Stores */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Lojas</h3>
            <div className="space-y-2">
              {availableStores.map(store => (
                <div key={store} className="flex items-center space-x-3 p-2 rounded-xl bg-secondary/50">
                  <Checkbox
                    id={store}
                    checked={localFilters.stores.includes(store)}
                    onCheckedChange={() => handleStoreToggle(store)}
                  />
                  <Label htmlFor={store} className="flex-1 cursor-pointer text-sm">
                    {store}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Minimum Discount */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Desconto mínimo</h3>
              <span className="text-sm font-medium text-primary">{localFilters.minDiscount}%</span>
            </div>
            <Slider
              value={[localFilters.minDiscount]}
              onValueChange={([value]) => setLocalFilters(prev => ({ ...prev, minDiscount: value }))}
              max={50}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Maximum Distance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Distância máxima</h3>
              <span className="text-sm font-medium text-primary">{localFilters.maxDistance}km</span>
            </div>
            <Slider
              value={[localFilters.maxDistance]}
              onValueChange={([value]) => setLocalFilters(prev => ({ ...prev, maxDistance: value }))}
              min={1}
              max={10}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1km</span>
              <span>10km</span>
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t border-border/50 pt-4">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-12 rounded-xl"
              onClick={handleReset}
            >
              <X className="w-4 h-4 mr-2" />
              Limpar
            </Button>
            <Button 
              className="flex-1 h-12 rounded-xl gradient-primary"
              onClick={handleApply}
            >
              Aplicar Filtros
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
