import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

const MenuForm2 = () => {
  const [allergens, setAllergens] = useState([]);
  const [allergenInput, setAllergenInput] = useState("");

  const addAllergen = () => {
    if (allergenInput.trim() && !allergens.includes(allergenInput.trim())) {
      setAllergens([...allergens, allergenInput.trim()]);
      setAllergenInput("");
    }
  };

  const removeAllergen = (allergen) => {
    setAllergens(allergens.filter(a => a !== allergen));
  };
  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Agregar Platillo
      </Button>
    </SheetTrigger>
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Agregar nuevo platillo</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-6">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
          <div className="w-32 h-32 mb-4 flex items-center justify-center bg-muted rounded-lg">
            <img
              src="/api/placeholder/128/128"
              alt="Food placeholder"
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>
          <Button variant="link" className="text-primary">
            Subir Imagen
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre del platillo</label>
          <Input 
            placeholder="Ej: Ensalada César"
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Categoría</label>
          <Select>
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entradas">Entradas</SelectItem>
              <SelectItem value="platos-fuertes">Platos Fuertes</SelectItem>
              <SelectItem value="bebidas">Bebidas</SelectItem>
              <SelectItem value="postres">Postres</SelectItem>
              <SelectItem value="sopas">Sopas</SelectItem>
              <SelectItem value="ensaladas">Ensaladas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Precio</label>
            <Input 
              type="number" 
              placeholder="0.00"
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tiempo de preparación</label>
            <Input 
              placeholder="Ej: 15 min"
              className="bg-muted"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Calorías</label>
          <Input 
            placeholder="Ej: 350 kcal"
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <Textarea 
            placeholder="Describe los ingredientes y preparación del platillo"
            className="min-h-[100px] bg-muted"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Alérgenos</label>
          <div className="flex gap-2">
            <Input 
              value={allergenInput}
              onChange={(e) => setAllergenInput(e.target.value)}
              placeholder="Ej: gluten, lácteos"
              className="bg-muted"
            />
            <Button 
              type="button" 
              variant="secondary"
              onClick={addAllergen}
            >
              Agregar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {allergens.map((allergen) => (
              <Badge 
                key={allergen} 
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeAllergen(allergen)}
              >
                {allergen} ×
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Estado</label>
          <Select>
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="unavailable">No disponible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SheetFooter className="sticky bottom-0 left-0 right-0 p-6 bg-background border-t mt-6">
        <div className="flex w-full gap-4">
          <Button variant="outline" className="flex-1">Cancelar</Button>
          <Button className="flex-1" type="submit">Guardar</Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
  );
};

export default MenuForm2;
