/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Filter, X, Utensils } from "lucide-react";
import InventarioForm from "@/components/InventarioForm";

const Inventario = () => {
  const [platillos, setPlatillos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredPlatillos, setFilteredPlatillos] = useState([]);
  const [filters, setFilters] = useState({
    estado: "Todos",
    categoria: "Todos",
    precioMin: "",
    precioMax: "",
  });

  // Fetch de datos de platillos
  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const response = await fetch("/api/platillos");
        const data = await response.json();
        setPlatillos(data);
        setFilteredPlatillos(data);
      } catch (error) {
        console.error("Error al cargar los platillos:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categorias");
        const data = await response.json();
        setCategories([{ id_categoria: 0, nombre: "Todos" }, ...data]);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchPlatillos();
    fetchCategories();
  }, []);

  // Filtrar platillos
  useEffect(() => {
    let filtered = [...platillos];

    // Filtro por estado
    if (filters.estado !== "Todos") {
      filtered = filtered.filter((platillo) => platillo.disponibilidad === filters.estado);
    }

    // Filtro por categoría
    if (filters.categoria !== "Todos") {
      filtered = filtered.filter((platillo) => platillo.nombre_categoria === filters.categoria);
    }

    // Filtro por rango de precio
    const minPrice = parseFloat(filters.precioMin);
    const maxPrice = parseFloat(filters.precioMax);
    if (!isNaN(minPrice)) {
      filtered = filtered.filter((platillo) => parseFloat(platillo.precio) >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      filtered = filtered.filter((platillo) => parseFloat(platillo.precio) <= maxPrice);
    }

    setFilteredPlatillos(filtered);
  }, [filters, platillos]);

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] m-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-4xl font-semibold text-foreground">Inventario</h2>
          <p className="text-muted-foreground mt-2">Gestiona el inventario de tu restaurante</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="lg:hidden"
            onClick={() => setFilters((prev) => ({ ...prev, estado: "Todos" }))}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <InventarioForm />
        </div>
      </header>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Filtros */}
        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium mb-3">Estado del Producto</h3>
            <div className="space-y-2 mb-6">
              {["Todos", "Disponible", "Low Stock", "No disponible"].map((estado) => (
                <Button
                  key={estado}
                  variant={filters.estado === estado ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={() => updateFilter("estado", estado)}
                >
                  {estado}
                </Button>
              ))}
            </div>

            <h3 className="text-sm font-medium mb-3">Categoría</h3>
            <Select
              value={filters.categoria}
              onValueChange={(value) => updateFilter("categoria", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id_categoria} value={category.nombre}>
                    {category.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <h3 className="text-sm font-medium mb-3 mt-6">Rango de Precio</h3>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Mínimo"
                value={filters.precioMin}
                onChange={(e) => updateFilter("precioMin", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Máximo"
                value={filters.precioMax}
                onChange={(e) => updateFilter("precioMax", e.target.value)}
              />
            </div>

            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={() => setFilters({ estado: "Todos", categoria: "Todos", precioMin: "", precioMax: "" })}
            >
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>

        {/* Tabla */}
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlatillos.map((platillo) => (
                    <TableRow key={platillo.id_platillo}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Utensils className="w-8 h-8 text-muted-foreground" />
                          <div>{platillo.nombre_platillo}</div>
                        </div>
                      </TableCell>
                      <TableCell>{platillo.cantidad_stock}</TableCell>
                      <TableCell>{platillo.disponibilidad}</TableCell>
                      <TableCell>{platillo.nombre_categoria}</TableCell>
                      <TableCell>${platillo.precio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventario;