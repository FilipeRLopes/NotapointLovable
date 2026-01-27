import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  Flame,
  Star,
  Heart,
  ChefHat,
  Share2,
  Bookmark,
  CheckCircle2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

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

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: (id: number) => void;
  onMarkAsDone: (id: number, rating: number) => void;
}

function StarRating({ onRate }: { onRate: (rating: number) => void }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
    onRate(rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-3 py-4"
    >
      <p className="text-sm text-muted-foreground">Como foi a receita?</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => handleRate(star)}
            className="p-1"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hoveredStar || selectedRating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30"
              }`}
            />
          </motion.button>
        ))}
      </div>
      {selectedRating > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-primary"
        >
          {selectedRating === 5 ? "Excelente!" : 
           selectedRating === 4 ? "Muito boa!" :
           selectedRating === 3 ? "Boa!" :
           selectedRating === 2 ? "Regular" : "Pode melhorar"}
        </motion.p>
      )}
    </motion.div>
  );
}

export function RecipeDetailModal({
  recipe,
  open,
  onOpenChange,
  onToggleFavorite,
  onMarkAsDone,
}: RecipeDetailModalProps) {
  const [showRating, setShowRating] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  if (!recipe) return null;

  const defaultInstructions = [
    "Prepare todos os ingredientes antes de começar.",
    "Siga as medidas indicadas para melhores resultados.",
    "Cozinhe em fogo médio até atingir o ponto desejado.",
    "Sirva imediatamente para melhor sabor."
  ];

  const instructions = recipe.instructions?.length ? recipe.instructions : defaultInstructions;

  const handleMarkAsDone = () => {
    setShowRating(true);
  };

  const handleRate = (rating: number) => {
    setHasRated(true);
    onMarkAsDone(recipe.id, rating);
    setTimeout(() => {
      onOpenChange(false);
      setShowRating(false);
      setHasRated(false);
    }, 1000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setShowRating(false);
    setHasRated(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[95vh] outline-none flex flex-col">
        {/* Hero Image - Fixed */}
        <div className="relative h-56 shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Drag handle */}
          <div className="absolute top-3 left-0 right-0 flex justify-center">
            <div className="w-12 h-1.5 bg-white/40 rounded-full" />
          </div>
          
          {/* Floating Actions - Fixed spacing */}
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg"
              onClick={() => onToggleFavorite(recipe.id)}
            >
              <Heart
                className={`w-5 h-5 ${
                  recipe.isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <DrawerClose asChild>
              <Button
                size="icon"
                variant="secondary"
                className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm text-white border-0">
              {recipe.category}
            </Badge>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">{recipe.name}</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-5 space-y-5">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Tempo</p>
                <p className="text-sm font-semibold">{recipe.time}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Porções</p>
                <p className="text-sm font-semibold">{recipe.servings}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Flame className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Calorias</p>
                <p className="text-sm font-semibold">{recipe.calories}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <Star className="w-5 h-5 mx-auto mb-1 fill-amber-400 text-amber-400" />
                <p className="text-xs text-muted-foreground">Nota</p>
                <p className="text-sm font-semibold">{recipe.rating || "N/A"}</p>
              </div>
            </div>

            {/* Difficulty & Match */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm py-1 px-3">{recipe.difficulty}</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm py-1 px-3">
                {recipe.matchPercentage}% compatível
              </Badge>
              {recipe.timesMade > 0 && (
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  Feita {recipe.timesMade}x
                </Badge>
              )}
            </div>

            <Separator />

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ChefHat className="w-4 h-4 text-primary" />
                </div>
                Ingredientes
              </h3>
              <div className="bg-muted/30 rounded-xl p-4">
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => {
                    const isMissing = recipe.missingIngredients.includes(ingredient);
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-3 ${
                          isMissing ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isMissing
                              ? "bg-destructive/10 border border-destructive/30"
                              : "bg-primary/10"
                          }`}
                        >
                          {!isMissing ? (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          ) : (
                            <X className="w-3 h-3 text-destructive" />
                          )}
                        </div>
                        <span className={`flex-1 ${isMissing ? "line-through" : ""}`}>
                          {ingredient}
                        </span>
                        {isMissing && (
                          <Badge variant="destructive" className="text-xs">
                            Falta
                          </Badge>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-primary" />
                </div>
                Modo de Preparo
              </h3>
              <ol className="space-y-4">
                {instructions.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1.5 flex-1">
                      {step}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Rating Section */}
            <AnimatePresence>
              {showRating && !hasRated && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Separator />
                  <StarRating onRate={handleRate} />
                </motion.div>
              )}
              {hasRated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-medium text-primary">Receita marcada como feita!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            {!showRating && (
              <div className="pt-2 pb-8">
                <Button 
                  className="w-full h-14 text-base font-semibold rounded-2xl shadow-lg" 
                  size="lg"
                  onClick={handleMarkAsDone}
                >
                  <ChefHat className="w-5 h-5 mr-2" />
                  Marcar como feita
                </Button>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
