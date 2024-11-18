import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, UserPlus } from 'lucide-react';
import axios from 'axios';

const StaffForm = () => {
  const [newStaff, setNewStaff] = useState({
    nombre: "",
    correo: "",
    rol: "",
    telefono: "",
    salario: "",
    fechaDeNacimiento: "",
    horarioInicio: "",
    horarioFinal: "",
    direccion: "",
    detallesAdicionales: "",
  });
  const [isOpen, setIsOpen] = useState(false); 

  const positions = [
    "Todos",
    "Cocinero/a",
    "Mesero/a",
    "Bartender",
    "Host",
    "Chef Ejecutivo",
    "Sous Chef",
    "Cajero/a",
    "Limpieza",
    "Administrador/a",
  ];

  const handleInputChange = (field) => (e) => {
    setNewStaff((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    // Validar campos requeridos
    const { nombre, correo, rol, telefono, salario, fechaDeNacimiento, horarioInicio, horarioFinal, direccion } = newStaff;
    if (!nombre || !correo || !rol || !telefono || !salario || !fechaDeNacimiento || !horarioInicio || !horarioFinal || !direccion) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    try {
      // Enviar datos al backend
      await axios.post('/api/staff', newStaff);
      alert('Personal registrado exitosamente.');

      // Limpiar campos y cerrar formulario
      setNewStaff({
        nombre: "",
        correo: "",
        rol: "",
        telefono: "",
        salario: "",
        fechaDeNacimiento: "",
        horarioInicio: "",
        horarioFinal: "",
        direccion: "",
        detallesAdicionales: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error al registrar personal:", error);
      alert('Hubo un error al registrar el personal.');
    }
  };

  const handleCancel = () => {
    // Limpiar campos y cerrar formulario
    setNewStaff({
      nombre: "",
      correo: "",
      rol: "",
      telefono: "",
      salario: "",
      fechaDeNacimiento: "",
      horarioInicio: "",
      horarioFinal: "",
      direccion: "",
      detallesAdicionales: "",
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2" onClick={() => setIsOpen(true)}>
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
            <InputWithLabel id="telefono" label="Teléfono" value={newStaff.telefono} onChange={handleInputChange('telefono')} />
            <InputWithLabel id="salario" label="Salario" value={newStaff.salario} onChange={handleInputChange('salario')} />
            <InputWithLabel id="fechaDeNacimiento" type="date" label="Fecha de nacimiento" value={newStaff.fechaDeNacimiento} onChange={handleInputChange('fechaDeNacimiento')} />
            <InputWithLabel id="horarioInicio" type="time" label="Hora de entrada" value={newStaff.horarioInicio} onChange={handleInputChange('horarioInicio')} />
            <InputWithLabel id="horarioFinal" type="time" label="Hora de salida" value={newStaff.horarioFinal} onChange={handleInputChange('horarioFinal')} />
          </div>
          <InputWithLabel id="direccion" label="Dirección" value={newStaff.direccion} onChange={handleInputChange('direccion')} />
        </div>
        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
          <Button variant="outline" className="flex-1" type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            Confirmar
          </Button>
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