import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, MapPin, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { StoreMapDialog } from "@/components/map/StoreMapDialog";
import { formatPriceUpdateDate } from "@/lib/formatDate";

interface ListItem {
  id: number;
  name: string;
  bestPrice: number;
  bestStore: string;
  checked: boolean;
  updatedAt?: Date;
}

const initialItems: ListItem[] = [
  { id: 1, name: "Arroz 5kg", bestPrice: 22.90, bestStore: "Atacadão", checked: false, updatedAt: new Date(Date.now() - 3600000) },
  { id: 2, name: "Feijão 1kg", bestPrice: 6.99, bestStore: "BomPreço", checked: false, updatedAt: new Date(Date.now() - 7200000) },
  { id: 3, name: "Óleo 900ml", bestPrice: 5.99, bestStore: "Extra", checked: true, updatedAt: new Date(Date.now() - 1800000) },
];

export default function ShoppingList() {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [newItem, setNewItem] = useState("");
  const [mapOpen, setMapOpen] = useState(false);
  
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([
      ...items,
      { id: Date.now(), name: newItem, bestPrice: 0, bestStore: "Buscando...", checked: false }
    ]);
    setNewItem("");
  };
  
  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const total = items.reduce((sum, item) => sum + item.bestPrice, 0);
  const checkedCount = items.filter(i => i.checked).length;
  
  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Lista de Compras</h1>
          <p className="text-muted-foreground">
            {checkedCount}/{items.length} itens • Estimado: R$ {total.toFixed(2).replace(".", ",")}
          </p>
        </motion.div>
        
        {/* Add Item */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          <Input
            type="text"
            placeholder="Adicionar item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            className="h-12 rounded-xl bg-card border-border/50"
          />
          <Button onClick={addItem} size="icon" className="h-12 w-12 rounded-xl">
            <Plus className="w-5 h-5" />
          </Button>
        </motion.div>
        
        {/* Items List */}
        <div className="space-y-3 mb-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-card rounded-2xl p-4 shadow-sm border border-border/50 transition-opacity ${
                item.checked ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    item.checked 
                      ? "bg-primary border-primary" 
                      : "border-border hover:border-primary"
                  }`}
                >
                  {item.checked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-primary-foreground rounded-full"
                    />
                  )}
                </button>
                
                <div className="flex-1">
                  <p className={`font-medium text-foreground ${item.checked ? "line-through" : ""}`}>
                    {item.name}
                  </p>
                  {item.bestPrice > 0 && (
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary">
                          R$ {item.bestPrice.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.bestStore}
                        </span>
                      </div>
                      {item.updatedAt && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          Preço atualizado em {formatPriceUpdateDate(item.updatedAt)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Smart Cart Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            variant="accent" 
            className="w-full h-14 rounded-2xl text-lg font-semibold"
            onClick={() => setMapOpen(true)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Onde comprar mais barato
          </Button>
        </motion.div>

        {/* Store Map Dialog */}
        <StoreMapDialog 
          open={mapOpen} 
          onOpenChange={setMapOpen} 
          cartItems={items} 
        />
      </div>
    </MobileLayout>
  );
}
