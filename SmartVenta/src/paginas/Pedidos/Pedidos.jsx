import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const data = [
    {
      number: 1,
      customerName: "Logan Roy",
      orderId: "990",
      status: "En Proceso",
      date: "Lunes, 28, 2024",
      time: "4:20 AM",
      items: [
        { qty: 1, name: "Chilaquiles", price: "199" },
        { qty: 1, name: "Sopita", price: "120" },
        { qty: 2, name: "Catsup con huevito", price: "220" },
        { qty: 1, name: "Coca", price: "110" },
      ],
      total: "649"
    },
    {
      number: 2,
      customerName: "Kendall Roy",
      orderId: "991",
      status: "Ready",
      date: "Lunes, 28, 2024",
      time: "4:30 AM",
      items: [
        { qty: 2, name: "Tacos", price: "150" },
        { qty: 1, name: "Quesadillas", price: "180" },
      ],
      total: "330"
    },
    {
      number: 3,
      customerName: "Shiv Roy",
      orderId: "992",
      status: "Completado",
      date: "Lunes, 28, 2024",
      time: "4:40 AM",
      items: [
        { qty: 1, name: "Enchiladas", price: "220" },
        { qty: 1, name: "Agua Fresca", price: "50" },
      ],
      total: "270"
    }
  ]

const OrderCard = ({ order, onDelete, onEdit, onPay }) => {
  const isCompleted = order.status === "Completado";
  
  return (
    <Card className="w-full">
      <CardContent className="p-4 lg:p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pink-200 text-black p-2 lg:p-3 rounded-lg font-semibold">
              {order.number.toString().padStart(2, '0')}
            </div>
            <div>
              <div className="font-medium text-sm lg:text-base">{order.customerName}</div>
              <div className="text-xs lg:text-sm text-gray-400">Order #{order.orderId}</div>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={
              order.status === 'Ready' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
              order.status === 'En Proceso' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
              order.status === 'Completado' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
              ''
            }
          >
            {order.status}
          </Badge>
        </div>

        <div className="text-xs lg:text-sm text-gray-400 mb-4">
          {order.date} {order.time}
        </div>

        <table className="w-full mb-4">
          <thead>
            <tr className="text-gray-400 text-xs lg:text-sm">
              <th className="text-left font-normal">Qty</th>
              <th className="text-left font-normal">Items</th>
              <th className="text-right font-normal">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="text-xs lg:text-sm">
                <td className="py-1">{item.qty.toString().padStart(2, '0')}</td>
                <td className="py-1">{item.name}</td>
                <td className="text-right py-1">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center border-t border-gray-800 pt-4">
          <div className="text-gray-400 text-sm lg:text-base">
            SubTotal
            <span className="ml-4 text-white">${order.total}</span>
          </div>
          {!isCompleted && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onEdit(order)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onDelete(order)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                className="bg-pink-200 text-black hover:bg-pink-300 text-sm"
                onClick={() => onPay(order)}
              >
                Pay Bill
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Ordenes = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  //simulando la llamada a la API
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setOrders(data);
        setLoading(false); 
      }, 1000);
    } catch (error) {
      console.error("Error loading orders:", error);
      setLoading(false);
    }
  };

  const handleNewOrder = () => {
    navigate('/nueva-orden');
  };

  const handleDelete = (order) => {
    if (window.confirm(`¿Estás seguro de eliminar la orden #${order.orderId}?`)) {
      setOrders(orders.filter(o => o.orderId !== order.orderId));
    }
  };

  const handleEdit = (order) => {
    navigate(`/editar-orden/${order.orderId}`);
  };

  const handlePay = (order) => {
    const updatedOrders = orders.map(o => 
      o.orderId === order.orderId 
        ? { ...o, status: "Completado" }
        : o
    );
    setOrders(updatedOrders);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.includes(searchTerm);
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "inProcess") return order.status === "En Proceso" && matchesSearch;
    if (currentTab === "completed") return order.status === "Completado" && matchesSearch;
    if (currentTab === "ready") return order.status === "Ready" && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-semibold text-foreground">Ordenes</h2>
        <div className="flex gap-4">
          <Button onClick={handleNewOrder}>
            Agregar Nueva Orden
          </Button>
          <Input 
            className="w-64" 
            placeholder="Buscar por nombre, orden, etc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
        <TabsList>
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-pink-200 data-[state=active]:text-black"
          >
            Todas
          </TabsTrigger>
          <TabsTrigger value="inProcess">En Proceso</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="text-center py-8">Cargando ordenes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order.orderId} 
              order={order}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onPay={handlePay}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Ordenes;