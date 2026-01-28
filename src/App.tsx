import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Scanner from "./pages/Scanner";
import ReceiptResult from "./pages/ReceiptResult";
import Search from "./pages/Search";
import ShoppingList from "./pages/ShoppingList";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import Finances from "./pages/Finances";
import Notifications from "./pages/Notifications";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import Deals from "./pages/Deals";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/receipt-result" element={<ReceiptResult />} />
          <Route path="/search" element={<Search />} />
          <Route path="/list" element={<ShoppingList />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
