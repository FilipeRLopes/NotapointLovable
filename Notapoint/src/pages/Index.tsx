import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScanLine, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { QuickStats } from "@/components/home/QuickStats";
import { RecentDeals } from "@/components/home/RecentDeals";

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <ScanLine className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">NotaPoint</h1>
              <p className="text-sm text-muted-foreground">Olá, Maria!</p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>
        </motion.div>
        
        {/* Quick Scan CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Button
            onClick={() => navigate("/scanner")}
            className="w-full h-20 rounded-2xl gradient-primary shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <ScanLine className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-primary-foreground">Escanear Nota</p>
                <p className="text-primary-foreground/80 text-sm">Contribua com os preços da cidade</p>
              </div>
            </div>
          </Button>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-4">Sua economia</h2>
          <QuickStats />
        </motion.div>
        
        {/* Recent Deals */}
        <RecentDeals />
      </div>
    </MobileLayout>
  );
}
