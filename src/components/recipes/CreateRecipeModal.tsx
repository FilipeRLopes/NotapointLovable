import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Clock,
  Users,
  Flame,
  ChefHat,
  ImageIcon,
  Trash2,
  X
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [imagePreview, setImagePreview] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState(2);
  const [difficulty, setDifficulty] = useState<"Fácil" | "Médio" | "Difícil">("Fácil");
  const [calories, setCalories] = useState(0);
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      image: imagePreview || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
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
    setImagePreview("");
    setTime("");
    setServings(2);
    setDifficulty("Fácil");
    setCalories(0);
    setCategory("");
    setIngredients([""]);
    setInstructions([""]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh] outline-none">
        <DrawerHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              Publicar Receita
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 max-h-[calc(95vh-10rem)]">
          <div className="p-5 space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nome da receita *</Label>
              <Input
                id="name"
                placeholder="Ex: Bolo de Cenoura"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Imagem */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Foto da receita</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              {!imagePreview ? (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full h-40 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Escolher foto</p>
                    <p className="text-xs text-muted-foreground">Toque para selecionar da galeria</p>
                  </div>
                </button>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Categoria e Dificuldade */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoria *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12 rounded-xl">
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
                <Label className="text-sm font-medium">Dificuldade</Label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
                  <SelectTrigger className="h-12 rounded-xl">
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
                <Label className="text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" /> Tempo *
                </Label>
                <Input
                  placeholder="30 min"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-1">
                  <Users className="w-3 h-3 text-primary" /> Porções
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-1">
                  <Flame className="w-3 h-3 text-primary" /> kcal
                </Label>
                <Input
                  type="number"
                  min={0}
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Ingredientes */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Ingredientes</Label>
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
                      className="h-12 rounded-xl"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      disabled={ingredients.length === 1}
                      className="shrink-0 h-12 w-12 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </motion.div>
                ))}
                <Button
                  variant="outline"
                  onClick={addIngredient}
                  className="w-full h-12 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" /> Adicionar ingrediente
                </Button>
              </div>
            </div>

            {/* Modo de Preparo */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Modo de preparo</Label>
              <div className="space-y-2">
                {instructions.map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-12 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}.
                    </div>
                    <Textarea
                      placeholder={`Passo ${index + 1}`}
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      className="min-h-[60px] rounded-xl"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                      disabled={instructions.length === 1}
                      className="shrink-0 h-12 w-12 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </motion.div>
                ))}
                <Button
                  variant="outline"
                  onClick={addInstruction}
                  className="w-full h-12 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" /> Adicionar passo
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Botões fixos no rodapé */}
        <div className="p-5 border-t border-border/50 bg-background">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-14 rounded-2xl text-base"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name || !category || !time}
              className="flex-1 h-14 rounded-2xl text-base font-semibold"
            >
              Publicar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
