import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error(`Error en la API: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data); 
        setDashboardData(data);
      } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Cargando datos del dashboard...</div>;
  }

  if (!dashboardData.length) {
    return <div>Error al cargar los datos del dashboard. Inténtalo más tarde.</div>;
  }


  const ventasTotales = dashboardData.reduce((acc, dia) => acc + parseFloat(dia.ventas_totales_dia), 0);
  const gananciasTotales = dashboardData.reduce((acc, dia) => acc + parseFloat(dia.ganancias_dia), 0);
  const mesasOcupadas = dashboardData.reduce((acc, dia) => acc + parseInt(dia.mesas_ocupadas_dia), 0);


  const salesData = dashboardData.map((dia) => ({
    fecha: new Date(dia.dia).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' }),
    ventas: dia.ventas_totales_dia,
  }));

 
  const platillosPopulares = dashboardData[0]?.platillos_populares || [];
  const platillosMenosVendidos = dashboardData[0]?.platillos_menos_vendidos || [];

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-semibold text-foreground">Dashboard Semanal</h2>
      </header>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${ventasTotales}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Ganancias Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${gananciasTotales}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Mesas Ocupadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mesasOcupadas}</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Ventas Semanales */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ventas Semanales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Platos Populares */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Platos Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Ventas</TableHead>
                <TableHead>Ganancias</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platillosPopulares.map((plato, index) => (
                <TableRow key={index}>
                  <TableCell>{plato.nombre}</TableCell>
                  <TableCell>{plato.ventas}</TableCell>
                  <TableCell>${plato.ganancias}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabla de Platos Menos Vendidos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Platos Menos Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Ventas</TableHead>
                <TableHead>Ganancias</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platillosMenosVendidos.map((plato, index) => (
                <TableRow key={index}>
                  <TableCell>{plato.nombre}</TableCell>
                  <TableCell>{plato.ventas}</TableCell>
                  <TableCell>${plato.ganancias}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;