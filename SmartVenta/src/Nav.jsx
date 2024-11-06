import './nav.css'; // Make sure to import your CSS file here
import { LayoutDashboard, ClipboardList, Banana, Users,User,Utensils,Bell,Box } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="sidebar">
            <div className="nav-header">
                <h3>Solo un dia</h3>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                            <LayoutDashboard className='icons' />
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/gestion" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                            <Users className='icons' />
                            <span>Personal</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                        <ClipboardList className='icons'/>
                            <span>Menú</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reservas" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                            <Banana className='icons'/>
                            <span>Reservas</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                         <Utensils className='icons'/>
                            <span>Pedidos/Mesas</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/inventario" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                        <Box className='icons'/>
                            <span>Inventario</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notificaciones" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                        <Bell className='icons'/>
                            <span>Notificaciones</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/perfil" className={({ isActive }) => isActive ? 'active' : ''}>
                        <div className="nav-item">
                        <User className='icons'/>
                            <span>Perfil</span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
