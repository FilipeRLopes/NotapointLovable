import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Receipt, Calendar, 
  ChevronDown, ChevronUp, DollarSign, Percent,
  ShoppingBag, Pill, Fuel, Zap, BarChart3, LineChart as LineChartIcon
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InflationCharts } from "@/components/finances/InflationCharts";
interface CategorySpending {
  id: string;
  name: string;
  icon: typeof ShoppingBag;
  total: number;
  previousTotal: number;
  taxes: {
    icms: number;
    iss: number;
    pis: number;
    cofins: number;
  };
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

const mockCategories: CategorySpending[] = [
  {
    id: "1",
    name: "Supermercado",
    icon: ShoppingBag,
    total: 1245.80,
    previousTotal: 1089.50,
    taxes: { icms: 224.24, iss: 0, pis: 20.56, cofins: 94.68 },
    items: [
      { name: "Arroz 5kg", price: 28.90, quantity: 3 },
      { name: "Feijão 1kg", price: 9.50, quantity: 4 },
      { name: "Óleo de Soja", price: 8.90, quantity: 2 },
      { name: "Açúcar 1kg", price: 5.40, quantity: 3 },
    ]
  },
  {
    id: "2",
    name: "Farmácia",
    icon: Pill,
    total: 287.45,
    previousTotal: 245.30,
    taxes: { icms: 48.87, iss: 0, pis: 4.74, cofins: 21.85 },
    items: [
      { name: "Dipirona", price: 12.90, quantity: 2 },
      { name: "Vitamina D", price: 45.90, quantity: 1 },
    ]
  },
  {
    id: "3",
    name: "Combustível",
    icon: Fuel,
    total: 580.00,
    previousTotal: 520.00,
    taxes: { icms: 156.60, iss: 0, pis: 9.57, cofins: 44.08 },
    items: [
      { name: "Gasolina", price: 5.80, quantity: 100 },
    ]
  },
  {
    id: "4",
    name: "Energia",
    icon: Zap,
    total: 245.67,
    previousTotal: 198.45,
    taxes: { icms: 61.42, iss: 0, pis: 4.05, cofins: 18.67 },
    items: [
      { name: "Conta de Luz", price: 245.67, quantity: 1 },
    ]
  },
];

const periods = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 3 meses" },
  { value: "180", label: "Últimos 6 meses" },
  { value: "365", label: "Último ano" },
];

export default function Finances() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const totalSpent = mockCategories.reduce((acc, cat) => acc + cat.total, 0);
  const previousTotal = mockCategories.reduce((acc, cat) => acc + cat.previousTotal, 0);
  const totalInflation = ((totalSpent - previousTotal) / previousTotal) * 100;

  const totalTaxes = mockCategories.reduce((acc, cat) => ({
    icms: acc.icms + cat.taxes.icms,
    iss: acc.iss + cat.taxes.iss,
    pis: acc.pis + cat.taxes.pis,
    cofins: acc.cofins + cat.taxes.cofins,
  }), { icms: 0, iss: 0, pis: 0, cofins: 0 });

  const totalTaxAmount = totalTaxes.icms + totalTaxes.iss + totalTaxes.pis + totalTaxes.cofins;
  const taxPercentage = (totalTaxAmount / totalSpent) * 100;

  return (
    <MobileLayout>
      <div className="p-4 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Finanças Pessoais</h1>
          <p className="text-muted-foreground">Acompanhe seus gastos e inflação</p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full bg-card border-border/50">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-2xl p-4 border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Total Gasto</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              R$ {totalSpent.toFixed(2)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`bg-card rounded-2xl p-4 border ${
              totalInflation > 0 ? "border-destructive/30" : "border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                totalInflation > 0 ? "bg-destructive/10" : "bg-primary/10"
              }`}>
                {totalInflation > 0 ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">Inflação Pessoal</span>
            </div>
            <div className={`text-xl font-bold ${
              totalInflation > 0 ? "text-destructive" : "text-primary"
            }`}>
              {totalInflation > 0 ? "+" : ""}{totalInflation.toFixed(1)}%
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inflation" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="inflation" className="text-sm">
              <LineChartIcon className="w-4 h-4 mr-1" />
              Inflação
            </TabsTrigger>
            <TabsTrigger value="spending" className="text-sm">
              <BarChart3 className="w-4 h-4 mr-1" />
              Gastos
            </TabsTrigger>
            <TabsTrigger value="taxes" className="text-sm">
              <Receipt className="w-4 h-4 mr-1" />
              Impostos
            </TabsTrigger>
          </TabsList>

          {/* Inflation Tab */}
          <TabsContent value="inflation">
            <InflationCharts />
          </TabsContent>

          {/* Spending Tab */}
          <TabsContent value="spending" className="space-y-3">
            {mockCategories.map((category, index) => {
              const inflation = ((category.total - category.previousTotal) / category.previousTotal) * 100;
              const isExpanded = expandedCategory === category.id;
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-lg font-bold text-foreground">
                        R$ {category.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${
                        inflation > 0 ? "text-destructive" : "text-primary"
                      }`}>
                        {inflation > 0 ? "+" : ""}{inflation.toFixed(1)}%
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground mx-auto mt-1" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground mx-auto mt-1" />
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
                        <div className="p-4 space-y-3">
                          <div className="text-sm text-muted-foreground mb-2">
                            Itens comprados:
                          </div>
                          {category.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-foreground">{item.name} (x{item.quantity})</span>
                              <span className="text-muted-foreground">
                                R$ {(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="pt-3 border-t border-border/30">
                            <div className="text-xs text-muted-foreground mb-2">Impostos pagos:</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">ICMS:</span>
                                <span className="text-foreground">R$ {category.taxes.icms.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">PIS:</span>
                                <span className="text-foreground">R$ {category.taxes.pis.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">COFINS:</span>
                                <span className="text-foreground">R$ {category.taxes.cofins.toFixed(2)}</span>
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
          </TabsContent>

          {/* Taxes Tab */}
          <TabsContent value="taxes" className="space-y-4">
            {/* Total Tax Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl p-5 border border-destructive/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <Percent className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total em Impostos</p>
                  <p className="text-2xl font-bold text-foreground">
                    R$ {totalTaxAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Representa <span className="font-semibold text-destructive">{taxPercentage.toFixed(1)}%</span> do total gasto
              </p>
            </motion.div>

            {/* Tax Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Detalhamento por Imposto</h3>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">ICMS</span>
                  <span className="text-lg font-bold text-foreground">
                    R$ {totalTaxes.icms.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Imposto sobre Circulação de Mercadorias e Serviços
                </p>
                <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(totalTaxes.icms / totalTaxAmount) * 100}%` }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card rounded-2xl p-4 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">COFINS</span>
                  <span className="text-lg font-bold text-foreground">
                    R$ {totalTaxes.cofins.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Contribuição para Financiamento da Seguridade Social
                </p>
                <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${(totalTaxes.cofins / totalTaxAmount) * 100}%` }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-4 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">PIS</span>
                  <span className="text-lg font-bold text-foreground">
                    R$ {totalTaxes.pis.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Programa de Integração Social
                </p>
                <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${(totalTaxes.pis / totalTaxAmount) * 100}%` }}
                  />
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
