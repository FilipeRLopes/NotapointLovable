import { Home, Search, ScanLine, ShoppingCart, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Search, label: "Buscar", path: "/search" },
  { icon: ScanLine, label: "Escanear", path: "/scanner", isMain: true },
  { icon: ShoppingCart, label: "Lista", path: "/list" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 px-2 pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
              item.isMain && "relative -mt-6"
            )}
            activeClassName="text-primary"
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                {item.isMain ? (
                  <div className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200",
                    isActive 
                      ? "gradient-primary shadow-glow" 
                      : "bg-primary hover:shadow-xl"
                  )}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                ) : (
                  <item.icon className={cn(
                    "w-6 h-6 transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  item.isMain && "mt-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
