import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const data = [
  {
    hour: "12:00",
    days: ["Reservado", "Disponible", "Reservado", "Disponible", "Reservado", "Disponible", "Reservado"],
  },
  {
    hour: "13:00",
    days: ["Disponible", "Reservado", "Disponible", "Reservado", "Disponible", "Reservado", "Disponible"],
  },
];

const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const Reservas = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status) => {
    if (status === "Reservado") {
      return (
        <Badge variant="destructive" className="w-24 justify-center">
          Reservado
        </Badge>
      );
    }
    return (
      <Badge variant="success" className="w-24 justify-center bg-green-600">
        Disponible
      </Badge>
    );
  };

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
         <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Calendario de Reservas</h2>
          <p className="text-muted-foreground mt-2">  Gestiona las reservas de manera sencilla</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="">
                  Agregar Reserva
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Nueva Reserva</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  {/* Add your reservation form here */}
                  <p className="">Formulario de reserva (personalizable según necesidades)</p>
                </div>
              </DialogContent>
            </Dialog>
      </header>
      <div className="grid grid-cols-1 gap-8">

      <Card >
        <CardHeader >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
            <CardTitle>Reservas</CardTitle>
            </div>    
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="">Hora</TableHead>
                  {weekDays.map((day) => (
                    <TableHead key={day} className="text-center">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((reservation, index) => (
                  <TableRow 
                    key={index} 
                    className=""
                  >
                    <TableCell className="">
                      {reservation.hour}
                    </TableCell>
                    {reservation.days.map((status, dayIndex) => (
                      <TableCell key={dayIndex} className="text-center">
                        {getStatusBadge(status)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Reservas;