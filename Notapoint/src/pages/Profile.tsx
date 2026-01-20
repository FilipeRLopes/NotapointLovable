import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, MapPin, Receipt, Trophy, Bell, ChefHat, 
  ChevronRight, TrendingUp, Star, Settings, Wallet 
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";

const stats = [
  { label: "Notas enviadas", value: "127", icon: Receipt },
  { label: "Economia total", value: "R$ 342", icon: TrendingUp },
  { label: "Ranking", value: "#23", icon: Trophy },
];

const menuItems = [
  { icon: Bell, label: "Notificações", badge: "3", path: "/notifications" },
  { icon: Wallet, label: "Finanças Pessoais", highlight: true, path: "/finances" },
  { icon: ChefHat, label: "Receitas", path: "/recipes" },
  { icon: Star, label: "Favoritos", path: "/favorites" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="p-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Maria Silva</h1>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>São Paulo, SP</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span className="text-xs font-semibold text-accent">Nível Ouro</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border/50"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Finances Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 mb-6 relative overflow-hidden cursor-pointer"
          onClick={() => navigate("/finances")}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-primary-foreground" />
              <h3 className="text-lg font-bold text-primary-foreground">
                Finanças Pessoais
              </h3>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Veja sua inflação pessoal, gastos e impostos pagos
            </p>
          </div>
        </motion.div>
        
        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => item.path && navigate(item.path)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-sm border border-border/50 hover:bg-secondary/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                item.highlight ? "bg-amber-500/10 text-amber-500" : "bg-secondary text-primary"
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">
                {item.label}
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </MobileLayout>
  );
}
