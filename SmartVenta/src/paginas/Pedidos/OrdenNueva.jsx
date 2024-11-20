import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  Banana,
  CookingPot,
  Beer,
  CakeSlice,
  Soup,
  Salad,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Obtener íconos para las categorías
const getIconComponent = (categoryName) => {
  const icons = {
    Entradas: Banana,
    "Platos Fuertes": CookingPot,
    Bebidas: Beer,
    Postres: CakeSlice,
    Sopas: Soup,
    Ensaladas: Salad,
  };
  const IconComponent = icons[categoryName] || Utensils;
  return <IconComponent size={24} />;
};

const CategoriaCard = ({ icon, title, items, isSelected, onClick }) => (
  <Card
    className={`cursor-pointer transition-colors ${
      isSelected ? "bg-zinc-700" : "hover:bg-zinc-700"
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="text-pink-200 mb-2">{icon}</div>
      <div className="text-white font-medium">{title}</div>
      <div className="text-gray-400 text-sm">{items} platillos</div>
    </CardContent>
  </Card>
);

const MenuItem = ({ price, name, onAddToCart }) => (
  <Card className="hover:bg-zinc-900 transition-colors">
    <CardContent className="p-4">
      <div className="text-white mb-2">{name}</div>
      <div className="text-gray-400">${price.toFixed(2)}</div>
      <div className="flex justify-end mt-2">
        <Button onClick={onAddToCart}>Agregar</Button>
      </div>
    </CardContent>
  </Card>
);

const CartItem = ({ item, onUpdateQuantity }) => (
  <div className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
    <div className="flex items-center gap-4">
      <div className="bg-primary text-black w-8 h-8 rounded-lg flex items-center justify-center">
        {item.quantity}
      </div>
      <div>
        <div className="text-white">{item.name}</div>
        <div className="text-gray-400 text-sm">${item.price.toFixed(2)}</div>
      </div>
    </div>
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
      >
        -
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        +
      </Button>
    </div>
  </div>
);

const Cart = ({
  items,
  tableInfo,
  setTableInfo,
  waiters,
  onUpdateQuantity,
  onSendToKitchen,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <Card className="h-full">
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl text-white">Mesa</h2>
              <input
                type="number"
                className="bg-zinc-900 text-white px-2 py-1 rounded w-16"
                value={tableInfo.tableNumber}
                onChange={(e) =>
                  setTableInfo({ ...tableInfo, tableNumber: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <h3 className="text-gray-400">Mesero:</h3>
              <Select
                value={tableInfo.waiterId || ""}
                onValueChange={(value) =>
                  setTableInfo({ ...tableInfo, waiterId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar mesero" />
                </SelectTrigger>
                <SelectContent>
                  {waiters.map((waiter) => (
                    <SelectItem key={waiter.id_staff} value={waiter.id_staff}>
                      {waiter.nombre_completo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-4 mb-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
          ))}
        </div>

        {items.length > 0 && (
          <>
            <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex justify-between text-white">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Impuesto {(taxRate * 100).toFixed(0)}%</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full bg-primary text-black"
              onClick={onSendToKitchen}
            >
              Enviar a la Cocina
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const OrdenNueva = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [tableInfo, setTableInfo] = useState({ tableNumber: "01", waiterId: "" });
  const [waiters, setWaiters] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categorias");
        const categoriesData = await res.json();
        setCategories(
          categoriesData.map((category) => ({
            id: category.id_categoria,
            icon: getIconComponent(category.nombre),
            title: category.nombre,
            items: category.count || 0,
          }))
        );
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const res = await fetch("/api/platillos");
        const menuItemsData = await res.json();
        setMenuItems(
          menuItemsData.map((item) => ({
            id: item.id_platillo,
            name: item.nombre_platillo,
            price: parseFloat(item.precio),
            categoryId: item.id_categoria,
          }))
        );
      } catch (err) {
        console.error("Error al cargar platillos:", err);
      }
    };

    const fetchWaiters = async () => {
      try {
        const res = await fetch("/api/meseros");
        const waitersData = await res.json();
        setWaiters(waitersData.data || []);
      } catch (err) {
        console.error("Error al cargar meseros:", err);
      }
    };

    fetchCategories();
    fetchMenuItems();
    fetchWaiters();
  }, []);

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.categoryId === selectedCategory)
    : menuItems;

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleSubmit = async () => {
    if (!tableInfo.tableNumber || !tableInfo.waiterId || cartItems.length === 0) {
      alert("Por favor, selecciona una mesa, un mesero y agrega platillos antes de enviar la orden.");
      return;
    }

    const detalles = cartItems.map((item) => ({
      id_platillo: item.id,
      cantidad: item.quantity,
    }));

    const orderData = {
      id_staff: tableInfo.waiterId,
      numero_mesa: tableInfo.tableNumber,
      estado: "En proceso",
      detalles: detalles,
    };

    try {
      const response = await fetch("/api/ordenes/insertar-orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Orden enviada exitosamente!");
        setCartItems([]);
        navigate("/ordenes");
      } else {
        const errorData = await response.json();
        alert(`Error al enviar la orden: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error al enviar orden:", err);
      alert("Error al enviar la orden.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-4 sm:p-8 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div
            className="flex items-center gap-2 text-white cursor-pointer"
            onClick={() => navigate("/ordenes")}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            <h2 className="text-2xl sm:text-4xl">Órdenes</h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {categories.map((category) => (
                <CategoriaCard
                  key={category.id}
                  icon={category.icon}
                  title={category.title}
                  items={category.items}
                  isSelected={selectedCategory === category.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMenuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96">
            <Cart
              items={cartItems}
              tableInfo={tableInfo}
              setTableInfo={setTableInfo}
              waiters={waiters}
              onUpdateQuantity={handleUpdateQuantity}
              onSendToKitchen={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdenNueva;