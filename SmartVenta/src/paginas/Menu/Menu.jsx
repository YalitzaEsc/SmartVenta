import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Banana,
  CookingPot,
  Beer,
  CakeSlice,
  Soup,
  Salad,
  Search,
  MoreVertical,
  DollarSign,
  Tags,
  Utensils,
} from 'lucide-react';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: 1, name: 'Entradas', icon: <Banana className="h-8 w-8" />, count: 12 },
    { id: 2, name: 'Platos Fuertes', icon: <CookingPot className="h-8 w-8" />, count: 25 },
    { id: 3, name: 'Bebidas', icon: <Beer className="h-8 w-8" />, count: 18 },
    { id: 4, name: 'Postres', icon: <CakeSlice className="h-8 w-8" />, count: 15 },
    { id: 5, name: 'Sopas', icon: <Soup className="h-8 w-8" />, count: 8 },
    { id: 6, name: 'Ensaladas', icon: <Salad className="h-8 w-8" />, count: 10 }
  ];

  const dishes = [
    {
      id: 1,
      name: 'Ensalada César',
      price: 10.99,
      description: 'Lechuga romana fresca, crutones, queso parmesano',
      category: 'Ensaladas',
      status: 'available',
      imageUrl: '/api/placeholder/100/100',
      allergens: ['gluten', 'lacteos'],
      preparationTime: '10 min',
      calories: '350 kcal'
    },

  ];

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || dish.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Menú</h2>
          <p className="text-muted-foreground mt-2">Gestiona los platos y categorías del restaurante</p>
        </div>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Tags className="h-4 w-4" />
                Nueva Categoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                <DialogDescription>
                  Crea una nueva categoría para organizar tus platos
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input placeholder="Nombre de la categoría" />
                {/* Add icon selector */}
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Categoría</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Utensils className="h-4 w-4" />
                Nuevo Plato
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Plato</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles del nuevo plato
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Input placeholder="Nombre del plato" className="col-span-2" />
                <Input placeholder="Precio" type="number" />
                <Input placeholder="Tiempo de preparación" />
                <Input placeholder="Calorías" className="col-span-2" />
                <textarea 
                  className="col-span-2 min-h-[100px] flex rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descripción del plato"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Plato</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  onClick={() => setActiveCategory(category.name)}
                >
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-sm font-medium mb-1">{category.name}</h3>
                  <Badge variant="secondary">{category.count} platos</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Lista de Platos</CardTitle>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar platos..."
                    className="pl-8 w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plato</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={dish.imageUrl} 
                          alt={dish.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{dish.name}</div>
                          <div className="text-sm text-muted-foreground">{dish.preparationTime}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{dish.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {dish.price.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={dish.status === 'available' ? 'success' : 'secondary'}
                      >
                        {dish.status === 'available' ? 'Disponible' : 'Agotado'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-muted-foreground">{dish.calories}</div>
                        <div className="flex gap-1">
                          {dish.allergens.map((allergen) => (
                            <Badge key={allergen} variant="outline" className="text-xs">
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>Editar plato</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar disponibilidad</DropdownMenuItem>
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Eliminar plato
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Menu;