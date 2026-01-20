import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Star, Store, TrendingDown, Heart, 
  MapPin, Clock 
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { formatPriceUpdateDate } from "@/lib/formatDate";

interface FavoriteProduct {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  lowestPrice: number;
  store: string;
  priceChange: number;
  updatedAt?: Date;
}

interface FavoriteStore {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  lastVisit: string;
}

const favoriteProducts: FavoriteProduct[] = [
  {
    id: 1,
    name: "Leite Integral Piracanjuba 1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop",
    currentPrice: 5.99,
    lowestPrice: 4.89,
    store: "Carrefour",
    priceChange: -8,
    updatedAt: new Date(Date.now() - 2 * 3600000),
  },
  {
    id: 2,
    name: "Arroz Tio João 5kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
    currentPrice: 24.90,
    lowestPrice: 22.50,
    store: "Extra",
    priceChange: 3,
    updatedAt: new Date(Date.now() - 5 * 3600000),
  },
  {
    id: 3,
    name: "Café Pilão 500g",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop",
    currentPrice: 15.49,
    lowestPrice: 13.99,
    store: "Pão de Açúcar",
    priceChange: -5,
    updatedAt: new Date(Date.now() - 1 * 3600000),
  },
  {
    id: 4,
    name: "Feijão Carioca Camil 1kg",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop",
    currentPrice: 8.29,
    lowestPrice: 6.99,
    store: "Atacadão",
    priceChange: 12,
    updatedAt: new Date(Date.now() - 12 * 3600000),
  },
];

const favoriteStores: FavoriteStore[] = [
  {
    id: 1,
    name: "Carrefour Aricanduva",
    address: "Av. Aricanduva, 5555",
    distance: "1.2 km",
    rating: 4.5,
    lastVisit: "Há 2 dias",
  },
  {
    id: 2,
    name: "Extra Anália Franco",
    address: "R. Regente Feijó, 1739",
    distance: "2.8 km",
    rating: 4.2,
    lastVisit: "Há 1 semana",
  },
  {
    id: 3,
    name: "Pão de Açúcar Tatuapé",
    address: "R. Serra de Botucatu, 1085",
    distance: "3.5 km",
    rating: 4.7,
    lastVisit: "Há 3 dias",
  },
];

export default function Favorites() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(favoriteProducts);
  const [stores, setStores] = useState(favoriteStores);

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const removeStore = (id: number) => {
    setStores((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <MobileLayout hideNav>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Favoritos</h1>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="stores">Lojas</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="space-y-3">
              {products.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhum produto favorito
                  </p>
                </motion.div>
              ) : (
                products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-card rounded-2xl border border-border/50"
                  >
                    <div className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-foreground">
                            R$ {product.currentPrice.toFixed(2)}
                          </span>
                          <span
                            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                              product.priceChange < 0
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {product.priceChange > 0 ? "+" : ""}
                            {product.priceChange}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <TrendingDown className="w-3 h-3" />
                          <span>
                            Menor: R$ {product.lowestPrice.toFixed(2)} •{" "}
                            {product.store}
                          </span>
                        </div>
                        {product.updatedAt && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                            <Clock className="w-2.5 h-2.5" />
                            <span>Preço atualizado em {formatPriceUpdateDate(product.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Star className="w-5 h-5 fill-primary" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="stores">
            <div className="space-y-3">
              {stores.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma loja favorita</p>
                </motion.div>
              ) : (
                stores.map((store, index) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-card rounded-2xl border border-border/50"
                  >
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Store className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">
                          {store.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{store.address}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {store.rating}
                          </span>
                          <span>{store.distance}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {store.lastVisit}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeStore(store.id)}
                        className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-primary" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
