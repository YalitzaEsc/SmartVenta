import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffForm from '@/components/StaffForm';
import StaffManagement from '@/components/StaffManagement';
import StaffAsistencia from '@/components/StaffAsistencia';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todos");
  const [staffData, setStaffData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch de la API para Staff
  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/staff'); 
        if (!response.ok) {
          throw new Error('Error al cargar los datos del staff');
        }
        const data = await response.json();
        setStaffData(data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaffData();
  }, []);

  // Fetch de la API para Asistencia
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('/api/asistencia'); 
        if (!response.ok) {
          throw new Error('Error al cargar los datos de asistencia');
        }
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Agregar nuevo staff al backend
  const addNewStaff = async (newStaff) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el nuevo staff');
      }
      const addedStaff = await response.json();
      setStaffData((prevData) => [...prevData, addedStaff]);
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
          <StaffAsistencia attendanceData={attendanceData} setAttendanceData={setAttendanceData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Staff;