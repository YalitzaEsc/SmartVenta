import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';
import axios from 'axios';

const InventarioForm = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [precio, setPrecio] = useState('');
  const [costo, setCosto] = useState('');
  const [calorias, setCalorias] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('Disponible');
  const [isOpen, setIsOpen] = useState(false); // Controlar apertura del formulario

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        alert('No se pudieron cargar las categorías');
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!nombre || !categoria || !precio || !costo || !cantidad || !calorias) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await axios.post('/api/platillos', {
        nombre,
        categoria,
        precio,
        costo,
        calorias,
        cantidad_stock: cantidad,
        disponibilidad,
      });

      console.log('Platillo creado:', response.data.platillo);
      alert('Platillo creado exitosamente');

      // Limpiar los campos después de guardar
      setNombre('');
      setCategoria('');
      setPrecio('');
      setCosto('');
      setCantidad('');
      setCalorias('');
      setDisponibilidad('Disponible');

      // Cerrar el formulario
      setIsOpen(false);
    } catch (error) {
      console.error('Error al crear platillo:', error);
      alert('Hubo un error al crear el platillo');
    }
  };

  const handleCancel = () => {
    // Limpiar los campos al cancelar
    setNombre('');
    setCategoria('');
    setPrecio('');
    setCosto('');
    setCantidad('');
    setCalorias('');
    setDisponibilidad('Disponible');

    // Cerrar el formulario
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2" onClick={() => setIsOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Agregar Platillo
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Agregar nuevo platillo</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre del platillo</label>
              <Input
                placeholder="Ej: Ensalada César"
                className="bg-muted"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select onValueChange={setCategoria} value={categoria}>
                <SelectTrigger className="bg-muted">
                  <SelectValue>
                    {categoria
                      ? categorias.find((cat) => cat.id_categoria === parseInt(categoria, 10))?.nombre
                      : 'Selecciona una categoría'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id_categoria} value={cat.id_categoria.toString()}>
                      {cat.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Precio y Costo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-muted"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Costo de preparación</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-muted"
                  value={costo}
                  onChange={(e) => setCosto(e.target.value)}
                />
              </div>
            </div>

            {/* Calorías y Cantidad */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Calorías</label>
                <Input
                  placeholder="Ej: 350 kcal"
                  className="bg-muted"
                  value={calorias}
                  onChange={(e) => setCalorias(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad en unidades</label>
                <Input
                  placeholder="Ej: 10"
                  className="bg-muted"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
            </div>
          </div>

          <SheetFooter className="sticky bottom-0 left-0 right-0 p-6 bg-background border-t mt-6">
            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                className="flex-1"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button className="flex-1" type="submit">
                Guardar
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default InventarioForm;