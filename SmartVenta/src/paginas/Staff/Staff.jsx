
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StaffForm from '@/components/StaffForm';
import StaffManagement from '@/components/StaffManagement';
import StaffAsistencia from '@/components/StaffAsistencia';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Gestión de Personal</h2>
          <p className="text-muted-foreground mt-2">Administra el equipo del restaurante</p>
        </div>
        <StaffForm />
      </header>
      
      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="attendance">Asistencia</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <StaffManagement searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
        </TabsContent>
        <TabsContent value="attendance">
          <StaffAsistencia />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Staff;