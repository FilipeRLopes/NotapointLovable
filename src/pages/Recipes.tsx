import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChefHat, 
  Heart, 
  Clock, 
  Users, 
  Flame, 
  Star, 
  TrendingUp, 
  Sparkles,
  BookOpen,
  Search,
  ChevronRight,
  ShoppingBag,
  Plus,
  X,
  CheckCircle2
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreateRecipeModal, NewRecipe } from "@/components/recipes/CreateRecipeModal";
import { RecipeDetailModal } from "@/components/recipes/RecipeDetailModal";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  servings: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  calories: number;
  matchPercentage: number;
  ingredients: string[];
  missingIngredients: string[];
  isFavorite: boolean;
  timesMade: number;
  rating: number;
  category: string;
  instructions?: string[];
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: "Arroz com Feijão Tradicional",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
    time: "45 min",
    servings: 4,
    difficulty: "Fácil",
    calories: 380,
    matchPercentage: 100,
    ingredients: ["Arroz", "Feijão", "Alho", "Cebola", "Sal"],
    missingIngredients: [],
    isFavorite: true,
    timesMade: 12,
    rating: 4.8,
    category: "Almoço"
  },
  {
    id: 2,
    name: "Frango Grelhado com Legumes",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
    time: "35 min",
    servings: 2,
    difficulty: "Fácil",
    calories: 420,
    matchPercentage: 85,
    ingredients: ["Peito de Frango", "Abobrinha", "Cenoura", "Alho"],
    missingIngredients: ["Abobrinha"],
    isFavorite: false,
    timesMade: 5,
    rating: 4.5,
    category: "Almoço"
  },
  {
    id: 3,
    name: "Omelete de Queijo",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
    time: "15 min",
    servings: 1,
    difficulty: "Fácil",
    calories: 280,
    matchPercentage: 100,
    ingredients: ["Ovos", "Queijo", "Sal", "Manteiga"],
    missingIngredients: [],
    isFavorite: true,
    timesMade: 18,
    rating: 4.9,
    category: "Café da Manhã"
  },
  {
    id: 4,
    name: "Macarrão ao Molho de Tomate",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    time: "25 min",
    servings: 3,
    difficulty: "Fácil",
    calories: 450,
    matchPercentage: 70,
    ingredients: ["Macarrão", "Tomate", "Alho", "Cebola", "Manjericão"],
    missingIngredients: ["Manjericão", "Tomate"],
    isFavorite: false,
    timesMade: 8,
    rating: 4.3,
    category: "Jantar"
  },
  {
    id: 5,
    name: "Salada Caesar",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
    time: "20 min",
    servings: 2,
    difficulty: "Médio",
    calories: 320,
    matchPercentage: 60,
    ingredients: ["Alface", "Frango", "Parmesão", "Croutons", "Molho Caesar"],
    missingIngredients: ["Croutons", "Molho Caesar"],
    isFavorite: false,
    timesMade: 3,
    rating: 4.6,
    category: "Almoço"
  },
  {
    id: 6,
    name: "Bolo de Chocolate",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    time: "60 min",
    servings: 8,
    difficulty: "Médio",
    calories: 380,
    matchPercentage: 90,
    ingredients: ["Farinha", "Chocolate", "Ovos", "Açúcar", "Leite"],
    missingIngredients: ["Chocolate em pó"],
    isFavorite: true,
    timesMade: 4,
    rating: 4.9,
    category: "Sobremesa"
  }
];

const categories = ["Todas", "Café da Manhã", "Almoço", "Jantar", "Sobremesa", "Lanche"];

export default function Recipes() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [activeTab, setActiveTab] = useState("recomendadas");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAvailableDrawerOpen, setIsAvailableDrawerOpen] = useState(false);

  const handleCreateRecipe = (newRecipe: NewRecipe) => {
    const recipe: Recipe = {
      id: Date.now(),
      ...newRecipe,
      matchPercentage: 100,
      missingIngredients: [],
      isFavorite: false,
      timesMade: 0,
      rating: 0,
    };
    setRecipes([recipe, ...recipes]);
  };

  const toggleFavorite = (id: number) => {
    setRecipes(recipes.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const handleMarkAsDone = (id: number, rating: number) => {
    setRecipes(recipes.map(r => 
      r.id === id ? { ...r, timesMade: r.timesMade + 1, rating: rating } : r
    ));
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedRecipes = filteredRecipes.filter(r => r.matchPercentage >= 70).sort((a, b) => b.matchPercentage - a.matchPercentage);
  const favoriteRecipes = filteredRecipes.filter(r => r.isFavorite);
  const mostMadeRecipes = [...filteredRecipes].sort((a, b) => b.timesMade - a.timesMade);
  const trendingRecipes = [...filteredRecipes].sort((a, b) => b.rating - a.rating);
  
  // Receitas 100% disponíveis (sem ingredientes faltando)
  const fullyAvailableRecipes = recipes.filter(r => r.missingIngredients.length === 0);

  const getRecipesByTab = () => {
    switch (activeTab) {
      case "favoritas": return favoriteRecipes;
      case "mais-feitas": return mostMadeRecipes;
      case "trending": return trendingRecipes;
      default: return recommendedRecipes;
    }
  };

  const RecipeCard = ({ recipe, index }: { recipe: Recipe; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-36 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge 
            variant="secondary" 
            className="bg-background/90 backdrop-blur-sm text-foreground font-medium"
          >
            <Sparkles className="w-3 h-3 mr-1 text-primary" />
            {recipe.matchPercentage}% match
          </Badge>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              recipe.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`} 
          />
        </button>
        {recipe.missingIngredients.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs">
              <span className="text-muted-foreground">Falta: </span>
              <span className="text-foreground font-medium">
                {recipe.missingIngredients.slice(0, 2).join(", ")}
                {recipe.missingIngredients.length > 2 && ` +${recipe.missingIngredients.length - 2}`}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-1">{recipe.name}</h3>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {recipe.servings}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {recipe.calories} kcal
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-foreground">{recipe.rating}</span>
            {recipe.timesMade > 0 && (
              <span className="text-xs text-muted-foreground ml-1">
                • {recipe.timesMade}x feita
              </span>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {recipe.difficulty}
          </Badge>
        </div>
      </div>
    </motion.div>
  );

  const AvailableRecipeItem = ({ recipe }: { recipe: Recipe }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => {
        setIsAvailableDrawerOpen(false);
        setTimeout(() => setSelectedRecipe(recipe), 200);
      }}
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{recipe.name}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {recipe.rating}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-primary/10 text-primary border-0">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          100%
        </Badge>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </motion.div>
  );

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground">Receitas</h1>
              <p className="text-sm text-muted-foreground">
                Baseadas nas suas compras
              </p>
            </div>
            <Button
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar receitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4">
            <TabsList className="w-full bg-muted/50">
              <TabsTrigger value="recomendadas" className="flex-1 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Para você
              </TabsTrigger>
              <TabsTrigger value="favoritas" className="flex-1 text-xs">
                <Heart className="w-3 h-3 mr-1" />
                Favoritas
              </TabsTrigger>
              <TabsTrigger value="mais-feitas" className="flex-1 text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Mais feitas
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex-1 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Popular
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Quick Stats - Clicável */}
            {activeTab === "recomendadas" && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-4 border border-primary/20 text-left hover:from-primary/15 hover:to-accent/15 transition-colors"
                onClick={() => setIsAvailableDrawerOpen(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {fullyAvailableRecipes.length} receitas prontas para fazer
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Você tem todos os ingredientes necessários
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.button>
            )}

            {/* Recipe Grid */}
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {getRecipesByTab().map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {getRecipesByTab().length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <ChefHat className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-center">
                  {activeTab === "favoritas" 
                    ? "Nenhuma receita favorita ainda"
                    : "Nenhuma receita encontrada"}
                </p>
              </motion.div>
            )}
          </div>
        </Tabs>

        <CreateRecipeModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreateRecipe}
        />

        <RecipeDetailModal
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
          onToggleFavorite={toggleFavorite}
          onMarkAsDone={handleMarkAsDone}
        />

        {/* Drawer de Receitas Disponíveis */}
        <Drawer open={isAvailableDrawerOpen} onOpenChange={setIsAvailableDrawerOpen}>
          <DrawerContent className="max-h-[85vh] outline-none flex flex-col">
            <DrawerHeader className="border-b border-border/50 pb-4 shrink-0">
              <div className="flex items-center justify-between">
                <DrawerTitle className="flex items-center gap-2 text-xl">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  Prontas para fazer
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </DrawerClose>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Receitas com 100% dos ingredientes disponíveis
              </p>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4">
              <div className="space-y-3">
                {fullyAvailableRecipes.map((recipe) => (
                  <AvailableRecipeItem key={recipe.id} recipe={recipe} />
                ))}
                
                {fullyAvailableRecipes.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground text-center">
                      Nenhuma receita com todos os ingredientes disponíveis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </MobileLayout>
  );
}
