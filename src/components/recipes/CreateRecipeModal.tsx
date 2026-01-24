import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Clock,
  Users,
  Flame,
  ChefHat,
  Image as ImageIcon,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateRecipeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (recipe: NewRecipe) => void;
}

export interface NewRecipe {
  name: string;
  image: string;
  time: string;
  servings: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  calories: number;
  category: string;
  ingredients: string[];
  instructions: string[];
}

const categories = ["Café da Manhã", "Almoço", "Jantar", "Sobremesa", "Lanche"];
const difficulties = ["Fácil", "Médio", "Difícil"] as const;

export function CreateRecipeModal({ open, onOpenChange, onSubmit }: CreateRecipeModalProps) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState(2);
  const [difficulty, setDifficulty] = useState<"Fácil" | "Médio" | "Difícil">("Fácil");
  const [calories, setCalories] = useState(0);
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };
  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };
  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleSubmit = () => {
    if (!name || !category || !time) return;

    const newRecipe: NewRecipe = {
      name,
      image: imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      time,
      servings,
      difficulty,
      calories,
      category,
      ingredients: ingredients.filter(i => i.trim() !== ""),
      instructions: instructions.filter(i => i.trim() !== ""),
    };

    onSubmit(newRecipe);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setTime("");
    setServings(2);
    setDifficulty("Fácil");
    setCalories(0);
    setCategory("");
    setIngredients([""]);
    setInstructions([""]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            Publicar Receita
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome da receita *</Label>
            <Input
              id="name"
              placeholder="Ex: Bolo de Cenoura"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image">URL da imagem</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon" type="button">
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg mt-2"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>

          {/* Categoria e Dificuldade */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dificuldade</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tempo, Porções, Calorias */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Tempo *
              </Label>
              <Input
                placeholder="30 min"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Users className="w-3 h-3" /> Porções
              </Label>
              <Input
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Flame className="w-3 h-3" /> kcal
              </Label>
              <Input
                type="number"
                min={0}
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Ingredientes */}
          <div className="space-y-2">
            <Label>Ingredientes</Label>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder={`Ingrediente ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </motion.div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addIngredient}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-1" /> Adicionar ingrediente
              </Button>
            </div>
          </div>

          {/* Modo de Preparo */}
          <div className="space-y-2">
            <Label>Modo de preparo</Label>
            <div className="space-y-2">
              {instructions.map((instruction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-9 flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {index + 1}.
                  </div>
                  <Textarea
                    placeholder={`Passo ${index + 1}`}
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInstruction(index)}
                    disabled={instructions.length === 1}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </motion.div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addInstruction}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-1" /> Adicionar passo
              </Button>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name || !category || !time}
              className="flex-1"
            >
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
