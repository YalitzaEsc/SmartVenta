/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, UserPlus } from 'lucide-react';

const StaffForm = () => {
  const [newStaff, setNewStaff] = useState({
    fullName: "",
    email: "",
    role: "",
    phone: "",
    salary: "",
    dateOfBirth: "",
    shiftStart: "",
    shiftEnd: "",
    address: "",
    additionalDetails: ""
  });

  const handleNewStaffChange = (field) => (e) => {
    setNewStaff(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    // Implementación de la lógica de envío
    console.log(newStaff);
  };

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Agregar Personal
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar nuevo personal</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-6">
          {/* Form fields */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage />
              <AvatarFallback>
                <Image className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Cambiar foto de perfil</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <InputWithLabel id="fullName" label="Nombre completo" value={newStaff.fullName} onChange={handleNewStaffChange('fullName')} />
            {/* Email */}
            <InputWithLabel id="email" type="email" label="Correo electrónico" value={newStaff.email} onChange={handleNewStaffChange('email')} />
            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Select value={newStaff.role} onValueChange={(value) => setNewStaff(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  {positions.slice(1).map((position) => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <InputWithLabel id="phone" label="Teléfono" value={newStaff.phone} onChange={handleNewStaffChange('phone')} />

            <InputWithLabel id="salary" label="Salario" value={newStaff.salary} onChange={handleNewStaffChange('salary')} />

            <InputWithLabel id="dateOfBirth" type="date" label="Fecha de nacimiento" value={newStaff.dateOfBirth} onChange={handleNewStaffChange('dateOfBirth')} />

            <InputWithLabel id="shiftStart" type="time" label="Hora de entrada" value={newStaff.shiftStart} onChange={handleNewStaffChange('shiftStart')} />

            <InputWithLabel id="shiftEnd" type="time" label="Hora de salida" value={newStaff.shiftEnd} onChange={handleNewStaffChange('shiftEnd')} />
          </div>
 
          <InputWithLabel id="address" label="Dirección" value={newStaff.address} onChange={handleNewStaffChange('address')} />
 
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Detalles adicionales</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Ingrese cualquier información adicional relevante"
              value={newStaff.additionalDetails}
              onChange={handleNewStaffChange('additionalDetails')}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <SheetFooter className="flex-row gap-3 sm:justify-end">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const InputWithLabel = ({ id, label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} />
  </div>
);

export default StaffForm;
