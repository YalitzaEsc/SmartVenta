
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';
import { Label } from "./ui/label";

const categories = [
  "Carnes",
  "Mariscos",
  "Pasta",
  "Bebidas",
  "Lácteos",
  "Aceites",
  "Especias",
  "Verduras"
];
const InventarioForm = () => {
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
          <SheetTitle className="text-white text-xl">Agregar Nuevo Inventario</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
            <div className="w-24 h-24 mb-4 flex items-center justify-center bg-muted rounded-lg">
              <img
                src="/api/placeholder/96/96"
                alt="Icon placeholder"
                className="w-12 h-12 text-muted-foreground"
              />
            </div>
            <Button variant="link" className="text-primary">
              Cambiar Icono
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-zinc-400">Nombre</Label>
              <Input 
                placeholder="nombre del nuevo inventario"
                className="mt-1.5 bg-muted/50 border-none text-white"
              />
            </div>

            <div>
              <Label className="text-zinc-400">Categoria</Label>
              <Select>
                <SelectTrigger className="mt-1.5 bg-muted/50 border-none text-white">
                  <SelectValue placeholder="todo lo que tu me pidas" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat}value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Cantidad</Label>
                <Input 
                placeholder="ingresa cantidad"
                className="mt-1.5 bg-muted/50 border-none text-white"
              />
              </div>

            </div>

            <div>
              <Label className="text-zinc-400">Precio</Label>
              <Input 
                placeholder="Ingresa precio de inventario"
                className="mt-1.5 bg-muted/50 border-none text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button 
              variant="ghost" 
              className="flex-1 text-white hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-primary text-white hover:bg-pink-500"
            >
              Guardar
            </Button>
          </div>
        </div>
      </SheetContent>
  </Sheet>
  );
};

export default InventarioForm;
