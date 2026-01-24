import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Flame,
  Star,
  Heart,
  ChefHat,
  Share2,
  Bookmark,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
}

export function RecipeDetailModal({
  recipe,
  open,
  onOpenChange,
  onToggleFavorite,
}: RecipeDetailModalProps) {
  if (!recipe) return null;

  const defaultInstructions = [
    "Prepare todos os ingredientes antes de começar.",
    "Siga as medidas indicadas para melhores resultados.",
    "Cozinhe em fogo médio até atingir o ponto desejado.",
    "Sirva imediatamente para melhor sabor."
  ];

  const instructions = recipe.instructions?.length ? recipe.instructions : defaultInstructions;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden max-h-[90vh]">
        {/* Hero Image */}
        <div className="relative h-48">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Floating Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => onToggleFavorite(recipe.id)}
            >
              <Heart
                className={`w-4 h-4 ${
                  recipe.isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <Badge variant="secondary" className="mb-2 bg-background/80 backdrop-blur-sm">
              {recipe.category}
            </Badge>
            <h2 className="text-xl font-bold text-white">{recipe.name}</h2>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-12rem)]">
          <div className="p-4 space-y-4">
            {/* Stats Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {recipe.servings} porções
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  {recipe.calories} kcal
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{recipe.rating || "N/A"}</span>
              </div>
            </div>

            {/* Difficulty & Match */}
            <div className="flex gap-2">
              <Badge variant="outline">{recipe.difficulty}</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {recipe.matchPercentage}% match
              </Badge>
              {recipe.timesMade > 0 && (
                <Badge variant="secondary">
                  Feita {recipe.timesMade}x
                </Badge>
              )}
            </div>

            <Separator />

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-primary" />
                Ingredientes
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const isMissing = recipe.missingIngredients.includes(ingredient);
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-2 text-sm ${
                        isMissing ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isMissing
                            ? "bg-muted"
                            : "bg-primary/10"
                        }`}
                      >
                        {!isMissing && (
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                        )}
                      </div>
                      <span className={isMissing ? "line-through" : ""}>
                        {ingredient}
                      </span>
                      {isMissing && (
                        <Badge variant="outline" className="text-xs ml-auto">
                          Falta
                        </Badge>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <Separator />

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-primary" />
                Modo de Preparo
              </h3>
              <ol className="space-y-3">
                {instructions.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button className="w-full" size="lg">
                <ChefHat className="w-4 h-4 mr-2" />
                Marcar como feita
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
