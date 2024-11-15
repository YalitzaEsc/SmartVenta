import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Check } from 'lucide-react';

const StaffAsistencia = () => {
    const [attendanceData, setAttendanceData] = useState([
        {
            id: "#101",
            name: "Watson Joyce",
            role: "Manager",
            date: "16-Apr-2024",
            timing: "9am a 6pm",
            status: "Presente"
        },
        {
            id: "#102",
            name: "Maria Garcia",
            role: "Chef",
            date: "16-Apr-2024",
            timing: "9am a 6pm",
            status: "Ausente"
        },
        {
            id: "#103",
            name: "John Smith",
            role: "Waiter",
            date: "16-Apr-2024",
            timing: "9am a 6pm",
            status: "Medio Tiempo"
        },
        {
            id: "#104",
            name: "Sarah Johnson",
            role: "Hostess",
            date: "16-Apr-2024",
            timing: "9am a 6pm",
            status: "No Presente"
        }
    ]);

    const [editingId, setEditingId] = useState(null);

    const statusOptions = ['Presente', 'Ausente', 'Medio Tiempo', 'No Presente'];

    const getStatusBadgeVariant = (status) => {
        switch (status) {
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

    const handleStatusChange = async (employeeId, newStatus) => {
        // Simulación de llamada a API
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            setAttendanceData(currentData =>
                currentData.map(employee =>
                    employee.id === employeeId
                        ? { ...employee, status: newStatus }
                        : employee
                )
            );

            alert("thousand people down below");

            setEditingId(null);
        } catch (error) {
          alert("Are we still friends");
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
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Horario</TableHead>
                                    <TableHead>Estatus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendanceData.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{record.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{record.name}</div>
                                                    <div className="text-sm text-muted-foreground">{record.role}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.timing}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {editingId === record.id ? (
                                                    <div className="flex gap-2 flex-wrap">
                                                        {statusOptions.map((status) => (
                                                            <Button
                                                                key={status}
                                                                variant={record.status === status ? "default" : "outline"}
                                                                size="sm"
                                                                onClick={() => handleStatusChange(record.id, status)}
                                                                className="h-8"
                                                            >
                                                                {status}
                                                                {record.status === status && (
                                                                    <Check className="ml-2 h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Badge variant={getStatusBadgeVariant(record.status)}>
                                                            {record.status}
                                                        </Badge>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => setEditingId(record.id)}
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