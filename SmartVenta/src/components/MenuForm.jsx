import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from 'lucide-react';
import axios from 'axios';

const MenuForm = () => {
  const [nombre, setNombre] = useState('');
  const [menu, setMenu] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!nombre || !menu || !descripcion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setIsSubmitting(true); 

    try {
      const response = await axios.post('/api/categorias', {
        nombre,
        menu,
        descripcion,
      });

      console.log('Categoría creada:', response.data.categoria);
      alert('Categoría creada exitosamente');

      // Limpiar los campos después de guardar
      setNombre('');
      setMenu('');
      setDescripcion('');

     
      setIsOpen(false);
    } catch (error) {
      
      if (error.response) {
        console.error('Error de respuesta del servidor:', error.response.data);
        alert(error.response.data.error || 'Hubo un problema en el servidor');
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        alert('No se pudo conectar con el servidor');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        alert('Hubo un error al enviar la solicitud');
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleCancel = () => {
   
    setNombre('');
    setMenu('');
    setDescripcion('');

    // Cerrar el formulario
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2" onClick={() => setIsOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Agregar Categoria
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar Nueva Categoria</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-8 space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium">Nombre de Categoria</label>
              <Input
                id="nombre"
                placeholder="Ingresa el nombre..."
                className="bg-muted"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Menú */}
            <div className="space-y-2">
              <label htmlFor="menu" className="text-sm font-medium">Menú</label>
              <Select onValueChange={setMenu} value={menu}>
                <SelectTrigger id="menu" className="bg-muted">
                  <SelectValue placeholder="Selecciona menú" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desayuno">Menú de Desayunos</SelectItem>
                  <SelectItem value="Almuerzo">Menú de Almuerzos</SelectItem>
                  <SelectItem value="Cena">Menú de Cenas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label htmlFor="descripcion" className="text-sm font-medium">Descripción</label>
              <Textarea
                id="descripcion"
                placeholder="Escribe la descripción"
                className="min-h-[120px] bg-muted"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>

          {/* Botones */}
          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <div className="flex w-full gap-4">
              <Button variant="outline" className="flex-1" type="button" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button className="flex-1 bg-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default MenuForm;