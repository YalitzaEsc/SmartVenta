import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {Pencil} from 'lucide-react'

const StaffAsistencia = () => {
    const attendanceData = [
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
          status: "Absente"
        },
        {
          id: "#103",
          name: "John Smith",
          role: "Waiter",
          date: "16-Apr-2024",
          timing: "9am a 6pm",
          status: "Half Shift"
        },
        {
          id: "#104",
          name: "Sarah Johnson",
          role: "Hostess",
          date: "16-Apr-2024",
          timing: "9am a 6pm",
          status: "Leave"
        }
      ];
    

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Presente':
        return 'default';
      case 'Absente':
        return 'warning';
      case 'Half Shift':
        return 'secondary';
      case 'Leave':
        return 'destructive';
      default:
        return 'default';
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
                            <Badge variant={getStatusBadgeVariant(record.status)}>
                              {record.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
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
