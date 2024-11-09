import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";

const Notificationes = () => {
  const notifications = [
    {
      id: 1,
      type: "Alerta de Inventario Bajo",
      message: "El inventario de Pollo Parmesano está por debajo del límite mínimo (5 unidades restantes)",
      date: "07/04/24",
      read: false
    },
    {
      id: 2,
      type: "Alerta de Inventario Bajo",
      message: "Las existencias de Arroz Basmati están por debajo del mínimo requerido (2 kg restantes)",
      date: "07/04/24",
      read: false
    },
    {
      id: 3,
      type: "Notificación de Pedido",
      message: "Nuevo pedido grande recibido para el evento corporativo del 10/04/24",
      date: "07/04/24",
      read: false
    },
    {
      id: 4,
      type: "Alerta de Caducidad",
      message: "Los siguientes productos vencerán en 3 días: Leche, Crema, Queso fresco",
      date: "07/04/24",
      read: true
    },
    {
      id: 5,
      type: "Alerta de Inventario Bajo",
      message: "Las existencias de Aceite de Oliva están por debajo del mínimo (1 litro restante)",
      date: "07/04/24",
      read: false
    },
    {
      id: 6,
      type: "Alerta de Sistema",
      message: "La copia de seguridad diaria se ha completado exitosamente",
      date: "07/04/24",
      read: true
    },
    {
      id: 7,
      type: "Recordatorio de Mantenimiento",
      message: "Mantenimiento programado para el horno principal mañana a las 6:00 AM",
      date: "07/04/24",
      read: false
    }
  ];

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Notificaciones</h2>
          <p className="text-muted-foreground mt-2">Chequea como se menea</p>
        </div>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="secondary" className="bg-primary/10 hover:bg-primary/20">
            Todas
          </Button>
          <Button variant="outline">
            Sin leer
          </Button>
        </div>
        <Button variant="secondary">
          Marcar todas como leídas
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <Card key={notification.id} className={cn(
            "transition-colors",
            notification.read ? "bg-background" : "bg-primary/5"
          )}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg p-2 bg-primary/10">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{notification.type}</h3>
                  <p className="text-muted-foreground text-sm">{notification.message}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {notification.date}
                  </span>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notificationes;