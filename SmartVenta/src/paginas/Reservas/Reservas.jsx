/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const tables = [
  { id: "Bar", name: "Bar" },
  { id: "A1", name: "A1" },
  { id: "A2", name: "A2" },
  { id: "B1", name: "B1" },
  { id: "B2", name: "B2" },
  { id: "B3", name: "B3" },
  { id: "C1", name: "C1" },
  { id: "C2", name: "C2" },
];

const horario = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

const reservaciones = [
  {
    id: 1,
    table: "A2",
    startTime: "12:00",
    endTime: "13:00",
    guest: "Iñigo Montoya",
    persons: "2"
  },
  {
    id: 2,
    table: "B1",
    startTime: "14:00",
    endTime: "16:00",
    guest: "Cochilocoo",
    persons: "4"
  },
  {
    id: 3,
    table: "Bar",
    startTime: "18:00",
    endTime: "19:00",
    guest: "Hitler",
    persons: "3"
  }
];

const Reservas = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getReservationStyle = (reservation) => {
    const startIndex = horario.indexOf(reservation.startTime);
    const endIndex = horario.indexOf(reservation.endTime);
    const duration = endIndex - startIndex;
    
    return {
      position: 'absolute',
      left: `${(startIndex / horario.length) * 100}%`,
      width: `${(duration / horario.length) * 100}%`,
      height: '80%',
      zIndex: 10,
    };
  };

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Calendario de Reservas</h2>
          <p className="text-muted-foreground mt-2">Gestiona las reservas de manera sencilla</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              Agregar Reserva
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva Reserva</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <p>She looked like me!</p>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Reservas</CardTitle>
              </div>    
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <div className="flex border-b">
                  <div className="w-24 p-4 font-medium sticky left-0 bg-background z-20">Table</div>
                  {horario.map((time) => (
                    <div key={time} className="flex-1 p-4 text-center font-medium border-l">
                      {time}
                    </div>
                  ))}
                </div>

                <div>
                  {tables.map((table) => (
                    <div key={table.id} className="flex border-b relative group">
                      <div className="w-24 p-4 font-medium sticky left-0 bg-background z-20 group-hover:bg-muted/50">
                        {table.name}
                      </div>
                      <div className="flex-1 flex relative">
                        {horario.map((time, index) => (
                          <div
                            key={`${table.id}-${time}`}
                            className="flex-1 border-l h-20 group-hover:bg-muted/50"
                          />
                        ))}
                        {reservaciones
                          .filter(res => res.table === table.id)
                          .map((reservation) => (
                            <div
                              key={reservation.id}
                              style={getReservationStyle(reservation)}
                              className="absolute top-[10%]"
                            >
                              <Button
                                variant="default"
                                className="h-full w-full flex flex-col items-start justify-center truncate"
                              >
                                <span className="text-sm font-medium truncate">{reservation.guest}</span>
                                <span className="text-xs flex items-center gap-1">
                                  <span className="inline-block">👤</span>
                                  {reservation.persons}
                                </span>
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reservas;