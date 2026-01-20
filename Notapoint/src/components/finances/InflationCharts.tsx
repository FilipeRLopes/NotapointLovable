import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, TrendingDown, ChevronDown, ChevronUp, 
  Wallet, PiggyBank, BarChart2, Store
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductInflation {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  marketAvgPrice: number;
  priceHistory: {
    month: string;
    myPrice: number;
    marketPrice: number;
  }[];
  taxes: number;
  savings: number;
  inflationRate: number;
}

const mockProducts: ProductInflation[] = [
  {
    id: "1",
    name: "Leite Integral 1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop",
    currentPrice: 6.49,
    marketAvgPrice: 7.29,
    priceHistory: [
      { month: "Jul", myPrice: 5.29, marketPrice: 5.89 },
      { month: "Ago", myPrice: 5.49, marketPrice: 6.19 },
      { month: "Set", myPrice: 5.79, marketPrice: 6.49 },
      { month: "Out", myPrice: 5.99, marketPrice: 6.89 },
      { month: "Nov", myPrice: 6.29, marketPrice: 7.09 },
      { month: "Dez", myPrice: 6.49, marketPrice: 7.29 },
    ],
    taxes: 0.78,
    savings: 4.80,
    inflationRate: 22.7,
  },
  {
    id: "2",
    name: "Arroz 5kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
    currentPrice: 28.90,
    marketAvgPrice: 32.50,
    priceHistory: [
      { month: "Jul", myPrice: 24.90, marketPrice: 27.90 },
      { month: "Ago", myPrice: 25.50, marketPrice: 28.90 },
      { month: "Set", myPrice: 26.90, marketPrice: 30.50 },
      { month: "Out", myPrice: 27.50, marketPrice: 31.20 },
      { month: "Nov", myPrice: 28.20, marketPrice: 31.90 },
      { month: "Dez", myPrice: 28.90, marketPrice: 32.50 },
    ],
    taxes: 3.47,
    savings: 21.60,
    inflationRate: 16.1,
  },
  {
    id: "3",
    name: "Feijão 1kg",
    image: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=100&h=100&fit=crop",
    currentPrice: 9.50,
    marketAvgPrice: 10.90,
    priceHistory: [
      { month: "Jul", myPrice: 7.90, marketPrice: 8.90 },
      { month: "Ago", myPrice: 8.20, marketPrice: 9.30 },
      { month: "Set", myPrice: 8.50, marketPrice: 9.70 },
      { month: "Out", myPrice: 8.90, marketPrice: 10.20 },
      { month: "Nov", myPrice: 9.20, marketPrice: 10.50 },
      { month: "Dez", myPrice: 9.50, marketPrice: 10.90 },
    ],
    taxes: 1.14,
    savings: 8.40,
    inflationRate: 20.3,
  },
  {
    id: "4",
    name: "Óleo de Soja 900ml",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop",
    currentPrice: 8.90,
    marketAvgPrice: 9.70,
    priceHistory: [
      { month: "Jul", myPrice: 7.50, marketPrice: 8.20 },
      { month: "Ago", myPrice: 7.80, marketPrice: 8.50 },
      { month: "Set", myPrice: 8.10, marketPrice: 8.90 },
      { month: "Out", myPrice: 8.40, marketPrice: 9.20 },
      { month: "Nov", myPrice: 8.70, marketPrice: 9.50 },
      { month: "Dez", myPrice: 8.90, marketPrice: 9.70 },
    ],
    taxes: 1.07,
    savings: 4.80,
    inflationRate: 18.7,
  },
];

// General inflation data
const generalInflationData = [
  { month: "Jul", inflation: 4.2, yourInflation: 3.8 },
  { month: "Ago", inflation: 4.5, yourInflation: 4.1 },
  { month: "Set", inflation: 4.8, yourInflation: 4.4 },
  { month: "Out", inflation: 5.2, yourInflation: 4.9 },
  { month: "Nov", inflation: 5.6, yourInflation: 5.1 },
  { month: "Dez", inflation: 5.9, yourInflation: 5.4 },
];

// Devaluation data (purchasing power)
const devaluationData = [
  { month: "Jul", value: 100 },
  { month: "Ago", value: 97.8 },
  { month: "Set", value: 95.4 },
  { month: "Out", value: 92.9 },
  { month: "Nov", value: 90.3 },
  { month: "Dez", value: 87.6 },
];

export function InflationCharts() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const totalSavings = mockProducts.reduce((acc, p) => acc + p.savings, 0);
  const totalTaxes = mockProducts.reduce((acc, p) => acc + p.taxes, 0);
  const avgInflation = mockProducts.reduce((acc, p) => acc + p.inflationRate, 0) / mockProducts.length;
  const purchasingPowerLoss = 100 - devaluationData[devaluationData.length - 1].value;

  const selectedProductData = selectedProduct 
    ? mockProducts.find(p => p.id === selectedProduct) 
    : null;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-4 border border-primary/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Economia Total</span>
          </div>
          <p className="text-xl font-bold text-primary">R$ {totalSavings.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">com o NotaPoint</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-2xl p-4 border border-destructive/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-destructive" />
            <span className="text-xs text-muted-foreground">Desvalorização</span>
          </div>
          <p className="text-xl font-bold text-destructive">-{purchasingPowerLoss.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground mt-1">poder de compra</p>
        </motion.div>
      </div>

      {/* General Inflation Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-4 border border-border/50"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Inflação Geral vs Sua</h3>
            <p className="text-xs text-muted-foreground">Comparativo de índices</p>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-muted-foreground">IPCA</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Sua</span>
            </div>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generalInflationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`${value}%`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="inflation" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--destructive))', r: 3 }}
                name="IPCA"
              />
              <Line 
                type="monotone" 
                dataKey="yourInflation" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                name="Sua Inflação"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Você economizou <span className="text-primary font-semibold">0.5%</span> em relação à inflação oficial
        </p>
      </motion.div>

      {/* Purchasing Power Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-4 border border-border/50"
      >
        <div className="mb-4">
          <h3 className="font-semibold text-foreground">Poder de Compra</h3>
          <p className="text-xs text-muted-foreground">Quanto R$100 vale ao longo do tempo</p>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={devaluationData}>
              <defs>
                <linearGradient id="devalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                domain={[80, 100]}
                tickFormatter={(value) => `R$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor Real']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--destructive))" 
                fill="url(#devalGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Product Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-4 border border-border/50"
      >
        <h3 className="font-semibold text-foreground mb-3">Análise por Produto</h3>
        <Select value={selectedProduct || ""} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-full bg-secondary/30 border-border/50">
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {mockProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                <div className="flex items-center gap-2">
                  <img src={product.image} alt={product.name} className="w-5 h-5 rounded object-cover" />
                  {product.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Selected Product Details */}
        <AnimatePresence>
          {selectedProductData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              {/* Product Header */}
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                <img 
                  src={selectedProductData.image} 
                  alt={selectedProductData.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{selectedProductData.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-foreground">
                      R$ {selectedProductData.currentPrice.toFixed(2)}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedProductData.inflationRate > 15 
                        ? "bg-destructive/20 text-destructive" 
                        : "bg-accent/20 text-accent"
                    }`}>
                      +{selectedProductData.inflationRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Comparison Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Seu Preço vs Mercado</p>
                  <div className="flex gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Você</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">Mercado</span>
                    </div>
                  </div>
                </div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedProductData.priceHistory} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickFormatter={(value) => `R$${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                      />
                      <Bar 
                        dataKey="myPrice" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        name="Seu Preço"
                      />
                      <Bar 
                        dataKey="marketPrice" 
                        fill="hsl(var(--muted-foreground))" 
                        opacity={0.5}
                        radius={[4, 4, 0, 0]}
                        name="Preço Médio"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Product Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-secondary/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Economia</p>
                  <p className="text-sm font-bold text-primary">
                    R$ {selectedProductData.savings.toFixed(2)}
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Impostos</p>
                  <p className="text-sm font-bold text-foreground">
                    R$ {selectedProductData.taxes.toFixed(2)}
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Média Mercado</p>
                  <p className="text-sm font-bold text-muted-foreground">
                    R$ {selectedProductData.marketAvgPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* All Products List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3 className="font-semibold text-foreground mb-3">Todos os Produtos</h3>
        <div className="space-y-2">
          {mockProducts.map((product, index) => {
            const isExpanded = expandedProduct === product.id;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                  className="w-full p-3 flex items-center gap-3 hover:bg-secondary/30 transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-foreground text-sm">{product.name}</h4>
                    <p className="text-foreground font-bold">
                      R$ {product.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      product.inflationRate > 15 ? "text-destructive" : "text-accent"
                    }`}>
                      +{product.inflationRate.toFixed(1)}%
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground mx-auto mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground mx-auto mt-1" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-3 space-y-3">
                        {/* Mini Chart */}
                        <div className="h-28">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={product.priceHistory}>
                              <XAxis 
                                dataKey="month" 
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px',
                                  fontSize: '11px'
                                }}
                                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="myPrice" 
                                stroke="hsl(var(--primary))" 
                                strokeWidth={2}
                                dot={false}
                                name="Você"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="marketPrice" 
                                stroke="hsl(var(--muted-foreground))" 
                                strokeWidth={1}
                                strokeDasharray="4 4"
                                dot={false}
                                name="Mercado"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                            <PiggyBank className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-muted-foreground">Economizou</p>
                              <p className="font-bold text-primary">R$ {product.savings.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                            <Store className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Média</p>
                              <p className="font-bold text-foreground">R$ {product.marketAvgPrice.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
