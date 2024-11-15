
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from 'lucide-react';

const MenuForm = () => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Agregar Categoria
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar Nueva Categoria</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
            <div className="w-24 h-24 mb-4 flex items-center justify-center bg-muted rounded-lg">
              <img
                src="/api/placeholder/96/96"
                alt="Icon placeholder"
                className="w-12 h-12 text-muted-foreground"
              />
            </div>
            <Button variant="link" className="text-primary">
              Change Icon
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre de Categoria</label>
            <Input 
              placeholder="Ingresa el nombre..."
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Menu</label>
            <Select>
              <SelectTrigger className="bg-muted">
                <SelectValue placeholder="Selecciona menu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Menu de Desayunos</SelectItem>
                <SelectItem value="lunch">Menu de Comida</SelectItem>
                <SelectItem value="dinner">Menu de Cenas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripcion</label>
            <Textarea 
              placeholder="i turn my headlights on and suddenly i see everything"
              className="min-h-[120px] bg-muted"
            />
          </div>
        </div>

        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
          <div className="flex w-full gap-4">
            <Button variant="outline" className="flex-1">Cancel</Button>
            <Button className="flex-1 bg-primary" type="submit">Save</Button>
          </div>
        </SheetFooter>
        </SheetContent>
    </Sheet>
  );
};

export default MenuForm;
