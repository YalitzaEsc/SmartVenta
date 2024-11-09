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
  TableRow 
} from "@/components/ui/table";
import InventarioForm from "@/components/InventarioForm";
import { useState } from "react";
import { Pencil, Trash2, Filter, X } from 'lucide-react';

const mockInventoryItems = [
  {
    name: "Filete de Res Premium",
    status: "Active",
    stock: "45 kg",
    category: "Carnes",
    price: "$28.99/kg",
    image: "/api/placeholder/64/64"
  },
  {
    name: "Pasta Fresca",
    status: "Low Stock",
    stock: "5 kg",
    category: "Pasta",
    price: "$12.50/kg",
    image: "/api/placeholder/64/64"
  },
  {
    name: "Vino Tinto Reserva",
    status: "Active",
    stock: "32 botellas",
    category: "Bebidas",
    price: "$45.00/u",
    image: "/api/placeholder/64/64"
  },
  {
    name: "Camarones Frescos",
    status: "Active",
    stock: "15 kg",
    category: "Mariscos",
    price: "$35.99/kg",
    image: "/api/placeholder/64/64"
  },
  {
    name: "Queso Parmesano",
    status: "Low Stock",
    stock: "3 kg",
    category: "Lácteos",
    price: "$22.50/kg",
    image: "/api/placeholder/64/64"
  },
  {
    name: "Aceite de Oliva Extra Virgen",
    status: "Active",
    stock: "25 litros",
    category: "Aceites",
    price: "$18.99/l",
    image: "/api/placeholder/64/64"
  }
];

const categories = [
  "Todos",
  "Carnes",
  "Mariscos",
  "Pasta",
  "Bebidas",
  "Lácteos",
  "Aceites",
  "Especias",
  "Verduras"
];

const Inventario = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const FilterSidebar = () => (
    <Card className="h-fit">
      <CardContent className="p-6">
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h3 className="font-medium">Filtros</h3>
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Estado del Producto</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                Todos
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">150</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Activos
                <span className="text-muted-foreground">120</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Stock Bajo
                <span className="text-muted-foreground">20</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Agotados
                <span className="text-muted-foreground">10</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Categoría</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Unidad de Medida</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilogramos</SelectItem>
                <SelectItem value="l">Litros</SelectItem>
                <SelectItem value="u">Unidades</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Rango de Precio</h3>
            <div className="space-y-2">
              <Input type="number" placeholder="Mínimo" />
              <Input type="number" placeholder="Máximo" />
            </div>
          </div>

          <Button variant="secondary" className="w-full">
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <InventarioForm />
        </div>
      </header>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <div className={`
          lg:hidden fixed inset-0 bg-background z-50 transition-transform transform
          ${showFilters ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full overflow-auto p-4">
            <FilterSidebar />
          </div>
        </div>

        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="hidden md:table-cell">Estado</TableHead>
                    <TableHead className="hidden sm:table-cell">Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventoryItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.stock}</div>
                            <div className="md:hidden">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                                item.status === 'Low Stock' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-primary/10 text-primary'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={`inline-flex px-2 py-1 rounded-full text-sm ${
                          item.status === 'Low Stock' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{item.category}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
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