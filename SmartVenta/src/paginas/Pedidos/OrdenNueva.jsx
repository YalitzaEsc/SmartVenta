import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Pizza,
    Drumstick,
    Cake,
    Coffee,
    Fish,
    ChevronLeft,
    Bell,
    Pencil,
    Menu
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Mock data remains the same...
const MOCK_DATA = {
    categories: [
        { id: 1, icon: 'pizza', title: 'Pizza', items: 20 },
        { id: 2, icon: 'burger', title: 'Burger', items: 15 },
        { id: 3, icon: 'chicken', title: 'Chicken', items: 10 },
        { id: 4, icon: 'bakery', title: 'Bakery', items: 18 },
        { id: 5, icon: 'beverage', title: 'Beverage', items: 12 },
        { id: 6, icon: 'seafood', title: 'Seafood', items: 16 }
    ],
    menuItems: [
        { id: 1, categoryId: 1, name: 'Pepperoni Pizza', price: 45.00 },
        { id: 2, categoryId: 1, name: 'Margherita Pizza', price: 40.00 },
        { id: 3, categoryId: 2, name: 'Classic Burger', price: 35.00 },
        { id: 4, categoryId: 3, name: 'Roasted Chicken', price: 55.00 },
        { id: 5, categoryId: 4, name: 'Chocolate Cake', price: 25.00 },
        { id: 6, categoryId: 5, name: 'Iced Coffee', price: 15.00 },
        { id: 7, categoryId: 6, name: 'Grilled Salmon', price: 65.00 }
    ],
    tableInfo: {
        tableNumber: '01',
        customerName: 'Watson Joyce'
    }
};

const getIconComponent = (iconName) => {
    const icons = {
        pizza: Pizza,
        burger: Drumstick,
        chicken: Drumstick,
        bakery: Cake,
        beverage: Coffee,
        seafood: Fish
    };
    const IconComponent = icons[iconName] || Drumstick;
    return <IconComponent size={24} />;
};

const CategoriaCard = ({ icon, title, items, isSelected, onClick }) => (
    <Card 
        className={`cursor-pointer transition-colors ${isSelected ? 'bg-zinc-700' : 'hover:bg-zinc-700'}`}
        onClick={onClick}
    >
        <CardContent className="p-4">
            <div className="text-pink-200 mb-2">{getIconComponent(icon)}</div>
            <div className="text-white font-medium">{title}</div>
            <div className="text-gray-400 text-sm">{items} items</div>
        </CardContent>
    </Card>
);

const MenuItem = ({ price, name, onAddToCart }) => (
    <Card className="hover:bg-zinc-900 transition-colors">
        <CardContent className="p-4">
            <div className="text-gray-400 mb-1">Orden → Cocina</div>
            <div className="text-white mb-2">{name}</div>
            <div className="text-gray-400">${price.toFixed(2)}</div>
            <div className="flex justify-end mt-2">
                <Button 
                    variant="" 
                    className=""
                    onClick={onAddToCart}
                >
                    <span className="hidden sm:inline">Add to Order</span>
                    <span className="sm:hidden">+</span>
                </Button>
            </div>
        </CardContent>
    </Card>
);

const CarritoItem = ({ item, onUpdateQuantity }) => (
    <div className="bg-zinc-800 p-2 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="bg-primary text-black w-8 h-8 rounded-lg flex items-center justify-center">
                {item.quantity}
            </div>
            <div>
                <div className="text-white text-sm sm:text-base">{item.name}</div>
                <div className="text-gray-400 text-sm">x {item.quantity}</div>
            </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-white">${(item.price * item.quantity).toFixed(2)}</div>
            <div className="flex items-center gap-2">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                    <span>-</span>
                </Button>
                <Button 
                    variant="" 
                    size="icon" 
                    className="h-8 w-8 "
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                    <span>+</span>
                </Button>
            </div>
        </div>
    </div>
);

const Cart = ({ items, tableInfo, onUpdateQuantity, onSendToKitchen }) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <Card className="h-full">
            <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg sm:text-xl text-white">Table {tableInfo.tableNumber}</h2>
                        <p className="text-gray-400 text-sm sm:text-base">{tableInfo.customerName}</p>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <Pencil size={16} />
                    </Button>
                </div>

                <div className="space-y-2 sm:space-y-4 mb-6">
                    {items.map(item => (
                        <CarritoItem 
                            key={item.id} 
                            item={item} 
                            onUpdateQuantity={onUpdateQuantity}
                        />
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
                                <span>Tax {(taxRate * 100)}%</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white text-base sm:text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button 
                                className="w-full bg-primary text-black"
                                onClick={onSendToKitchen}
                            >
                                Send To Kitchen
                            </Button>
                        </div>
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
    const [tableInfo, setTableInfo] = useState({});
    const [isCartVisible, setIsCartVisible] = useState(false);

    //aqui se llama la api para hacer el get con todas las ordenes
    useEffect(() => {
        setCategories(MOCK_DATA.categories);
        setMenuItems(MOCK_DATA.menuItems);
        setTableInfo(MOCK_DATA.tableInfo);
    }, []);

    const filteredMenuItems = selectedCategory
        ? menuItems.filter(item => item.categoryId === selectedCategory)
        : menuItems;

    const handleAddToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i => 
                    i.id === item.id 
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        setCartItems(prevItems => {
            if (newQuantity <= 0) {
                return prevItems.filter(item => item.id !== itemId);
            }
            return prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };

    const handleBack = () => {
        navigate('/ordenes');
      };
    //aqui se llama la API para crear una nueva orden
    const handleSubmit = async () => {
        try {
            console.log('Enviando la sigueitnte orden a la cocina:', {
                tableInfo,
                items: cartItems,
                timestamp: new Date().toISOString()
            });
            alert('Orden enviada a la cocina exitosamente!');
            setCartItems([]);
            setIsCartVisible(false);
            navigate('/ordenes');
        } catch (error) {
            console.error('Error al enviar la orden:', error);
            alert('Error al enviar orden');
        }
    };

    return (
        <div className="min-h-screen">
            <div className="p-4 sm:p-8 max-w-screen-xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-white cursor-pointer" onClick={handleBack}>
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                        <h2 className="text-2xl sm:text-4xl">Orders</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bell className="text-white h-5 w-5 sm:h-6 sm:w-6" />
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="lg:hidden"
                            onClick={() => setIsCartVisible(!isCartVisible)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="w-8 h-8 bg-primary rounded-full hidden sm:block"></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className={`flex-1 ${isCartVisible ? 'hidden' : 'block'} lg:block`}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                            {categories.map(category => (
                                <CategoriaCard
                                    key={category.id}
                                    {...category}
                                    isSelected={selectedCategory === category.id}
                                    onClick={() => setSelectedCategory(
                                        selectedCategory === category.id ? null : category.id
                                    )}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredMenuItems.map(item => (
                                <MenuItem
                                    key={item.id}
                                    {...item}
                                    onAddToCart={() => handleAddToCart(item)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={`w-full lg:w-96 ${isCartVisible ? 'block' : 'hidden'} lg:block`}>
                        <Cart
                            items={cartItems}
                            tableInfo={tableInfo}
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