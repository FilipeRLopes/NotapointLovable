import { motion } from "framer-motion";
import { TrendingDown, Receipt, Coins } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  delay?: number;
}

function StatCard({ icon, label, value, subtext, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.1, duration: 0.3 }}
      className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <span className="text-muted-foreground text-sm">{label}</span>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {subtext && <div className="text-xs text-muted-foreground mt-1">{subtext}</div>}
    </motion.div>
  );
}

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        icon={<Coins className="w-5 h-5" />}
        label="Economia do mês"
        value="R$ 127,40"
        subtext="vs. preço médio"
        delay={0}
      />
      <StatCard
        icon={<Receipt className="w-5 h-5" />}
        label="Notas escaneadas"
        value="23"
        subtext="este mês"
        delay={1}
      />
      <div className="col-span-2">
        <StatCard
          icon={<TrendingDown className="w-5 h-5" />}
          label="Melhor economia recente"
          value="Arroz 5kg - R$ 8,50 mais barato"
          subtext="Supermercado BomPreço • Hoje"
          delay={2}
        />
      </div>
    </div>
  );
}
