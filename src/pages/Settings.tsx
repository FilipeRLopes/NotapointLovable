import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, 
  FileText, LogOut, ChevronRight, Smartphone, MapPin,
  Trash2
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SettingToggle {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  enabled: boolean;
}

const initialToggles: SettingToggle[] = [
  {
    id: "notifications",
    icon: Bell,
    label: "Notificações Push",
    description: "Receba alertas de preços e ofertas",
    enabled: true,
  },
  {
    id: "darkMode",
    icon: Moon,
    label: "Modo Escuro",
    description: "Alternar tema da interface",
    enabled: false,
  },
  {
    id: "location",
    icon: MapPin,
    label: "Localização",
    description: "Usar GPS para encontrar lojas próximas",
    enabled: true,
  },
];

const menuSections = [
  {
    title: "Preferências",
    items: [
      { icon: Globe, label: "Idioma", value: "Português (BR)" },
      { icon: Smartphone, label: "Versão do App", value: "1.0.0" },
    ],
  },
  {
    title: "Conta",
    items: [
      { icon: Shield, label: "Privacidade e Segurança" },
      { icon: FileText, label: "Termos de Uso" },
      { icon: HelpCircle, label: "Ajuda e Suporte" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState(initialToggles);

  const handleToggle = (id: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
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
          <h1 className="text-xl font-bold text-foreground">Configurações</h1>
        </div>

        {/* Toggle Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 mb-6"
        >
          {toggles.map((toggle, index) => (
            <motion.div
              key={toggle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <toggle.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{toggle.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                checked={toggle.enabled}
                onCheckedChange={() => handleToggle(toggle.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium text-foreground">
                    {item.label}
                  </span>
                  {item.value ? (
                    <span className="text-sm text-muted-foreground">
                      {item.value}
                    </span>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:bg-red-500/5 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="flex-1 text-left font-medium text-red-500">
              Sair da conta
            </span>
          </button>

          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-destructive/30 hover:bg-destructive/5 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <span className="flex-1 text-left font-medium text-destructive">
              Excluir conta
            </span>
          </button>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-8 mb-4">
          NotaPoint v1.0.0 • Feito com ❤️ no Brasil
        </p>
      </div>
    </MobileLayout>
  );
}
