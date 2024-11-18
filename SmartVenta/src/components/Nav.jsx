import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users,
  Utensils,
  Bell,
  Box,
  LogOut,
  Menu, 
  Package2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Sheet, SheetContent,SheetDescription,SheetTitle ,SheetTrigger } from "@/components/ui/sheet";
import { Button } from './ui/button';
import logo from '../assets/logo.png'; 

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/gestion", icon: Users, label: "Personal" },
  { path: "/menu", icon: ClipboardList, label: "Menú" },
  { path: "/ordenes", icon: Utensils, label: "Pedidos/Mesas" },
  { path: "/inventario", icon: Box, label: "Inventario" },
  { path: "/notificaciones", icon: Bell, label: "Notificaciones" },
];

const Nav = () => {
  return (
    <header>
      <nav className="fixed left-0 top-0 h-screen w-[170px] border-r p-4 space-y-8 flex-col justify-between  hidden md:flex">

        <div>
          <div className="flex items-center justify-center py-4 border-b">
            <img src={logo} alt="" />
          </div>

          <div className="space-y-2 mt-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full p-3 rounded-2xl transition-colors duration-200",
                    "hover:bg-primary hover:text-gray-800",
                    isActive ? "bg-primary text-gray-800" : "text-gray-500"
                  )
                }
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">{label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <button
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl transition-colors duration-200 bg-gray-200 text-gray-800 hover:bg-primary"
            onClick={() => console.log('Cerrar sesión')}
          >
            <LogOut className="w-5 h-5 text-gray-700" />
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      </nav>
      <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden m-5">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
          <SheetTitle></SheetTitle>
          <SheetDescription>
      </SheetDescription>
            <nav className="grid gap-6 text-lg font-medium">
              <NavLink
                to="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </NavLink>
              <NavLink
                to="/" 
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full p-3 rounded-2xl transition-colors duration-200",
                    "hover:bg-primary hover:text-gray-800",
                    isActive ? "bg-primary text-gray-800" : "text-gray-500"
                  )
                }>
                Dashboard
              </NavLink>
              <NavLink
                to="/gestion"  
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full p-3 rounded-2xl transition-colors duration-200",
                    "hover:bg-primary hover:text-gray-800",
                    isActive ? "bg-primary text-gray-800" : "text-gray-500"
                  )
                }>
                Staff
              </NavLink>
              <NavLink
                to="/menu" 
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full p-3 rounded-2xl transition-colors duration-200",
                    "hover:bg-primary hover:text-gray-800",
                    isActive ? "bg-primary text-gray-800" : "text-gray-500"
                  )
                }>
                Menu
              </NavLink>
              <NavLink
                to="/inventario" 
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full p-3 rounded-2xl transition-colors duration-200",
                    "hover:bg-primary hover:text-gray-800",
                    isActive ? "bg-primary text-gray-800" : "text-gray-500"
                  )
                }
                >
                Inventario
              </NavLink>
              <NavLink
                to="/notificaciones" 
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full p-3 rounded-2xl transition-colors duration-200",
                    "hover:bg-primary hover:text-gray-800",
                    isActive ? "bg-primary text-gray-800" : "text-gray-500"
                  )
                }
                >
                Notificaciones
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>

    </header>
  );
};

export default Nav;
