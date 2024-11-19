import { useEffect, useState } from "react";
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
  Utensils,
  Banana,
  CookingPot,
  Beer,
  CakeSlice,
  Soup,
  Salad,
  Search,
  MoreVertical,
  DollarSign,
} from "lucide-react";

import MenuForm from "@/components/MenuForm";

const categoryIcons = {
  Entradas: <Banana className="h-8 w-8" />,
  "Platos Fuertes": <CookingPot className="h-8 w-8" />,
  Bebidas: <Beer className="h-8 w-8" />,
  Postres: <CakeSlice className="h-8 w-8" />,
  Sopas: <Soup className="h-8 w-8" />,
  Ensaladas: <Salad className="h-8 w-8" />,
};

const defaultIcon = <Utensils className="h-8 w-8 text-muted-foreground" />;

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [platillos, setPlatillos] = useState([]);

  // Fetch de categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categorias");
        const categoriesData = await response.json();

        const categoriesWithIcons = categoriesData.map((category) => ({
          ...category,
          icon: categoryIcons[category.nombre] || defaultIcon,
        }));

        setCategories(categoriesWithIcons);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch de platillos
  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const response = await fetch("/api/platillos");
        const platillosData = await response.json();
        setPlatillos(platillosData);
      } catch (error) {
        console.error("Error al cargar platillos:", error);
      }
    };

    fetchPlatillos();
  }, []);

  
  const filteredDishes = platillos.filter(
    (platillo) =>
      (activeCategory === "all" || platillo.nombre_categoria === activeCategory) &&
      platillo.nombre_platillo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Menú</h2>
          <p className="text-muted-foreground mt-2">
            Gestiona los platos y categorías del restaurante
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Categorías */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Categorías</CardTitle>
              {/* Botón para agregar categoría */}
              <MenuForm />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id_categoria}
                  className={`flex flex-col items-center justify-center p-6 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer ${
                    activeCategory === category.nombre ? "bg-accent" : ""
                  }`}
                  onClick={() => setActiveCategory(category.nombre)}
                >
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-sm font-medium mb-1">{category.nombre}</h3>
                  <Badge variant="secondary">
                    {category.count || 0} platos
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Platillos */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <CardTitle className="hidden md:flex">Lista de Platos</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar platos..."
                    className="pl-8 md:w-[300px]"
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
                  <TableHead>Calorías</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDishes.map((platillo) => (
                  <TableRow key={platillo.id_platillo}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">
                            {platillo.nombre_platillo}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {platillo.nombre_categoria}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {platillo.precio}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          platillo.disponibilidad === "Disponible"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {platillo.disponibilidad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {platillo.calorias} kcal
                      </div>
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