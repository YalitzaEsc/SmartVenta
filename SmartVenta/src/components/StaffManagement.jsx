/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Mail, BadgeCheck,Phone, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
const StaffManagement = ({ searchTerm, setSearchTerm, selectedRole, setSelectedRole }) => {
  const positions = ["Todos", "Cocinero", "Mesera", "Bartender", "Host", "Chef Ejecutivo", "Sous Chef", "Cajera", "Limpieza", "Administradora"];
  const data = [
    {
      id: 1,
      name: "Gonzalo Gonzales",
      position: "Cocinero",
      email: "juan@example.com",
      phone: "+1 123 456 7890",
      edad: "45 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 2,
      name: "Pedro Paramo",
      position: "Mesera",
      email: "maria@example.com",
      phone: "+1 123 456 7891",
      edad: "35 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 3,
      name: "López López",
      position: "Bartender",
      email: "carlos@example.com",
      phone: "+1 123 456 7892",
      edad: "35 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 4,
      name: "Ana Martínez",
      position: "Host",
      email: "ana@example.com",
      phone: "+1 123 456 7893",
      edad: "25 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      position: "Chef Ejecutivo",
      email: "roberto@example.com",
      phone: "+1 123 456 7894",
      edad: "15 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 6,
      name: "Laura Torres",
      position: "Sous Chef",
      email: "laura@example.com",
      phone: "+1 123 456 7895",
      edad: "5 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 7,
      name: "Diego Ramírez",
      position: "Mesero",
      email: "diego@example.com",
      phone: "+1 123 456 7896",
      edad: "75 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 8,
      name: "Patricia Flores",
      position: "Cajera",
      email: "patricia@example.com",
      phone: "+1 123 456 7897",
      edad: "85 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 9,
      name: "Miguel Herrera",
      position: "Limpieza",
      email: "miguel@example.com",
      phone: "+1 123 456 7898",
      edad: "15 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    },
    {
      id: 10,
      name: "Sofia Vargas",
      position: "Administradora",
      email: "sofia@example.com",
      phone: "+1 123 456 7899",
      edad: "115 yr",
      salario: "2200.00",
      horario: "9am a 6pm"
    }
  ];

  const filteredData = data.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || employee.position === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
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
                    <TableHead>Edad</TableHead>
                    <TableHead>Salario</TableHead>
                    <TableHead>Horario</TableHead>
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
                        <div className="flex flex-col gap-1">                          
                            <span className="text-sm">{employee.edad}</span>                          
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">                          
                            <span className="text-sm">$ {employee.salario}</span>                          
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">                          
                            <span className="text-sm">{employee.horario}</span>                          
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
  );
};

export default StaffManagement;
