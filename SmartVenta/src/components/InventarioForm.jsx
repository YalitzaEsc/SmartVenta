
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
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
          <SheetTitle className="text-white text-xl">Add New Inventory</SheetTitle>
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
                className="mt-1.5 bg-zinc-800 border-none text-white"
              />
            </div>

            <div>
              <Label className="text-zinc-400">Categoria</Label>
              <Select>
                <SelectTrigger className="mt-1.5 bg-zinc-800 border-none text-white">
                  <SelectValue placeholder="morire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo</SelectItem>
                  <SelectItem value="food">Comida</SelectItem>
                  <SelectItem value="drinks">Bebidas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400">Cantidad</Label>
                <Input 
                placeholder="ingresa cantidad"
                className="mt-1.5 bg-zinc-800 border-none text-white"
              />
              </div>

              <div>
                <Label className="text-zinc-400">Stock</Label>
                <Select>
                  <SelectTrigger className="mt-1.5 bg-zinc-800 border-none text-white">
                    <SelectValue placeholder="instock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instock">En Stock</SelectItem>
                    <SelectItem value="outofstock">Sin existencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-zinc-400">Estatus</Label>
              <Select>
                <SelectTrigger className="mt-1.5 bg-zinc-800 border-none text-white">
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-zinc-400">Precio</Label>
              <Input 
                placeholder="Enter inventory price"
                className="mt-1.5 bg-zinc-800 border-none text-white"
              />
            </div>

            <div>
              <Label className="text-zinc-400 block mb-2">Caduc...</Label>
              <RadioGroup defaultValue="yes" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" className="text-pink-400" />
                  <Label htmlFor="yes" className="text-white">Si</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="text-white">No</Label>
                </div>
              </RadioGroup>
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
