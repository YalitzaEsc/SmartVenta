
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, UserPlus } from 'lucide-react';

const StaffForm = ({addNewStaff}) => {
  const [newStaff, setNewStaff] = useState({
    nombre: "",
    correo: "",
    rol: "",
    telfono: "",
    salario: "",
    fechaDeNacimiento: "",
    horarioInicio: "",
    horarioFinal: "",
    direccion: "",
    detallesAdicionales: ""
  });

  const handleInputChange = (field) => (e) => {
    setNewStaff((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      addNewStaff(newStaff);
      setNewStaff({nombre: "", correo: "", rol: "", telefono: "", salario: "", horarioInicio: "", horarioFinal: "", }); 
    } catch (error) {
      console.error("Error adding new staff:", error);
    }
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
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Agregar nuevo personal</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-6">
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
            <InputWithLabel id="nombre" label="Nombre completo" value={newStaff.nombre} onChange={handleInputChange('nombre')} />

            <InputWithLabel id="correo" type="email" label="Correo electrónico" value={newStaff.correo} onChange={handleInputChange('correo')} />

            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Select value={newStaff.rol} onValueChange={(value) => setNewStaff(prev => ({ ...prev, rol: value }))}>
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

            <InputWithLabel id="telfono" label="Teléfono" value={newStaff.telfono} onChange={handleInputChange('telfono')} />

            <InputWithLabel id="salario" label="Salario" value={newStaff.salario} onChange={handleInputChange('salario')} />

            <InputWithLabel id="fechaDeNacimiento" type="date" label="Fecha de nacimiento" value={newStaff.fechaDeNacimiento} onChange={handleInputChange('fechaDeNacimiento')} />

            <InputWithLabel id="horarioInicio" type="time" label="Hora de entrada" value={newStaff.horarioInicio} onChange={handleInputChange('horarioInicio')} />

            <InputWithLabel id="horarioFinal" type="time" label="Hora de salida" value={newStaff.horarioFinal} onChange={handleInputChange('horarioFinal')} />
          </div>
 
          <InputWithLabel id="direccion" label="Dirección" value={newStaff.direccion} onChange={handleInputChange('direccion')} />
 
    
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
