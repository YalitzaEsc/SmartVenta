import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Check } from 'lucide-react';
import axios from 'axios';

const StaffAsistencia = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const statusOptions = ['Presente', 'Ausente', 'Medio Tiempo', 'No Presente'];

  const getStatusBadgeVariant = (estatus) => {
    switch (estatus) {
      case 'Presente':
        return 'default';
      case 'Ausente':
        return 'warning';
      case 'Medio Tiempo':
        return 'secondary';
      case 'No Presente':
        return 'destructive';
      default:
        return 'default';
    }
  };

  // Fetch de asistencia al montar el componente
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('/api/asistencia');
        console.log('Datos de asistencia:', response.data);
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error al obtener asistencia:', error);
        alert('No se pudieron cargar los datos de asistencia');
      }
    };

    fetchAttendance();
  }, []);

  const handleStatusChange = async (idAsistencia, newStatus) => {
    try {
      await axios.put(`/api/asistencia/${idAsistencia}`, { estatus: newStatus });
      setAttendanceData((currentData) =>
        currentData.map((record) =>
          record.id_asistencia === idAsistencia ? { ...record, estatus: newStatus } : record
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error('Error al actualizar el estado de asistencia:', error);
      alert('Hubo un error al actualizar el estado de asistencia');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Control de Asistencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Empleado</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record) => (
                  <TableRow key={record.id_asistencia}>
                 
                    <TableCell>{record.id_staff}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{record.nombre.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{record.nombre}</div>
                          <div className="text-sm text-muted-foreground">{record.cargo}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(record.fecha).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {editingId === record.id_asistencia ? (
                          <div className="flex gap-2 flex-wrap">
                            {statusOptions.map((estatus) => (
                              <Button
                                key={estatus}
                                variant={record.estatus === estatus ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleStatusChange(record.id_asistencia, estatus)}
                                className="h-8"
                              >
                                {estatus}
                                {record.estatus === estatus && (
                                  <Check className="ml-2 h-4 w-4" />
                                )}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <>
                            <Badge variant={getStatusBadgeVariant(record.estatus)}>
                              {record.estatus}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setEditingId(record.id_asistencia)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
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

export default StaffAsistencia;