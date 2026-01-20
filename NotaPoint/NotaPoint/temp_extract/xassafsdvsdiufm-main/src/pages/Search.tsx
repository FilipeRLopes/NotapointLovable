import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, ShoppingCart, Pill, Wine, Sparkles, Apple } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { CategoryPill } from "@/components/products/CategoryPill";
import { ProductCard } from "@/components/products/ProductCard";

const categories = [
  { icon: Sparkles, label: "Todos" },
  { icon: ShoppingCart, label: "Mercado" },
  { icon: Pill, label: "Farmácia" },
  { icon: Wine, label: "Bebidas" },
  { icon: Apple, label: "Hortifruti" },
];

const mockProducts = [
  { name: "Arroz Tio João 5kg", lowestPrice: 22.90, averagePrice: 28.50, store: "Atacadão", distance: "1.2km", trend: "down" as const },
  { name: "Leite Integral 1L", lowestPrice: 4.49, averagePrice: 5.99, store: "Supermercado BomPreço", distance: "800m", trend: "down" as const },
  { name: "Café Pilão 500g", lowestPrice: 12.90, averagePrice: 15.90, store: "Carrefour", distance: "2.1km", trend: "up" as const },
  { name: "Óleo de Soja 900ml", lowestPrice: 5.99, averagePrice: 7.49, store: "Extra", distance: "1.8km", trend: "down" as const },
  { name: "Açúcar União 1kg", lowestPrice: 4.29, averagePrice: 5.19, store: "Atacadão", distance: "1.2km" },
];

export default function Search() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Buscar produtos</h1>
          <p className="text-muted-foreground">Compare preços na sua cidade</p>
        </motion.div>
        
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar produto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-2xl bg-card border-border/50 text-lg"
          />
        </motion.div>
        
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-6"
        >
          {categories.map((cat) => (
            <CategoryPill
              key={cat.label}
              icon={cat.icon}
              label={cat.label}
              isActive={activeCategory === cat.label}
              onClick={() => setActiveCategory(cat.label)}
            />
          ))}
        </motion.div>
        
        {/* Results */}
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">{mockProducts.length} produtos encontrados</span>
          </div>
          
          {mockProducts.map((product, index) => (
            <ProductCard key={index} {...product} delay={index} />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
