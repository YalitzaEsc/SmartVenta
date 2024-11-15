import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffForm from '@/components/StaffForm';
import StaffManagement from '@/components/StaffManagement';
import StaffAsistencia from '@/components/StaffAsistencia';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch de la API
  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/staff');
        const data = [
          {
            id: 1,
            nombre: "Gonzalo Gonzales",
            rol: "Cocinero",
            correo: "juan@example.com",
            telfono: "+1 123 456 7890",
            salario: "2200.00",
            horarioInicio: "09:00",
            horarioFinal: "05:00",
          },
          {
            id: 2,
            nombre: "Pedro Paramo",
            rol: "Mesera",
            correo: "maria@example.com",
            telfono: "+1 123 456 7891",
            salario: "2200.00",
            horarioInicio: "09:00",
            horarioFinal: "05:00",
          },
          {
            id: 3,
            nombre: "López López",
            rol: "Bartender",
            correo: "carlos@example.com",
            telfono: "+1 123 456 7892",
            edad: "35 yr",
            salario: "2200.00",
            horarioInicio: "09:00",
            horarioFinal: "05:00",
          },
          {
            id: 4,
            nombre: "Ana Martínez",
            rol: "Host",
            correo: "ana@example.com",
            telfono: "+1 123 456 7893",
            edad: "25 yr",
            salario: "2200.00",
            horarioInicio: "09:00",
            horarioFinal: "05:00",
          },
          {
            id: 5,
            nombre: "Roberto Sánchez",
            rol: "Chef Ejecutivo",
            correo: "roberto@example.com",
            telfono: "+1 123 456 7894",
            edad: "15 yr",
            salario: "2200.00",
            horarioInicio: "09:00",
            horarioFinal: "05:00",
          },
        ];
        setStaffData(data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaffData();
  }, []);

  // Ejemplo haciendo POST
  const addNewStaff = async (newStaff) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
     
      setStaffData((prevData) => [...prevData, newStaff]);
    } catch (error) {
      console.error("Error adding new staff:", error);
    }
  };

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Gestión de Personal</h2>
          <p className="text-muted-foreground mt-2">Administra el equipo del restaurante</p>
        </div>
        <StaffForm addNewStaff={addNewStaff} />
      </header>
      
      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="attendance">Asistencia</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <StaffManagement
            staffData={staffData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value="attendance">
          <StaffAsistencia />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Staff;
