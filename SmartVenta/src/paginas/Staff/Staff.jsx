
import { useState } from 'react';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, UserPlus, Mail, Phone, BadgeCheck } from 'lucide-react';

const Staff = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
  
    // Mock data array with 10 employees
    const data = [
        {
            id: 1,
            name: "Gonzalo Gonzales",
            position: "Cocinero",
            email: "juan@example.com",
            phone: "+1 123 456 7890"
        },
        {
            id: 2,
            name: "Pedro Paramo",
            position: "Mesera",
            email: "maria@example.com",
            phone: "+1 123 456 7891"
        },
        {
            id: 3,
            name: "López López",
            position: "Bartender",
            email: "carlos@example.com",
            phone: "+1 123 456 7892"
        },
        {
            id: 4,
            name: "Ana Martínez",
            position: "Host",
            email: "ana@example.com",
            phone: "+1 123 456 7893"
        },
        {
            id: 5,
            name: "Roberto Sánchez",
            position: "Chef Ejecutivo",
            email: "roberto@example.com",
            phone: "+1 123 456 7894"
        },
        {
            id: 6,
            name: "Laura Torres",
            position: "Sous Chef",
            email: "laura@example.com",
            phone: "+1 123 456 7895"
        },
        {
            id: 7,
            name: "Diego Ramírez",
            position: "Mesero",
            email: "diego@example.com",
            phone: "+1 123 456 7896"
        },
        {
            id: 8,
            name: "Patricia Flores",
            position: "Cajera",
            email: "patricia@example.com",
            phone: "+1 123 456 7897"
        },
        {
            id: 9,
            name: "Miguel Herrera",
            position: "Limpieza",
            email: "miguel@example.com",
            phone: "+1 123 456 7898"
        },
        {
            id: 10,
            name: "Sofia Vargas",
            position: "Administradora",
            email: "sofia@example.com",
            phone: "+1 123 456 7899"
        }
    ];
    
  
    const positions = [
      "Todos",
      "Cocinero",
      "Mesera",
      "Bartender",
      "Host",
      "Chef Ejecutivo",
      "Sous Chef",
      "Cajera",
      "Limpieza",
      "Administradora"
    ];
  
    const filteredData = data.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "all" || employee.position === selectedRole;
      return matchesSearch && matchesRole;
    });
  
    const getStatusColor = (status) => {
      return status === 'active' ? 'bg-green-500' : 'bg-gray-500';
    };
  
    return (
      <div className="p-8 lg:max-w-screen-xl m-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-semibold text-foreground">Gestión de Personal</h2>
            <p className="text-muted-foreground mt-2">Administra el equipo del restaurante</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Agregar Personal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Personal</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo miembro del equipo
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input placeholder="Nombre completo" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.slice(1).map((pos) => (
                      <SelectItem key={pos} value={pos.toLowerCase()}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Correo electrónico" />
                <Input placeholder="Teléfono" />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader className="">
            <CardTitle>Lista de Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o correo..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cargos</SelectItem>
                  {positions.slice(1).map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            <div className="rounded-md border ">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.shift}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{employee.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="secondary" className="mb-1">
                            <BadgeCheck className="h-3 w-3 mr-1" />
                            {employee.position}
                          </Badge>
                          <div className="flex gap-1 flex-wrap">
                            {employee.specialties?.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.status === 'active' ? 'success' : 'secondary'}>
                          {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
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
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Ver horarios</DropdownMenuItem>
                            <DropdownMenuItem>Gestionar permisos</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
  
  export default Staff;