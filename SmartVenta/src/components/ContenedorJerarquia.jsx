import '../styles/ContenedorJerarquia.css';
import { Menu } from 'antd';
import Jerarquia from '../Classes/Jerarquia.jsx';
import { useState, useEffect } from 'react';

function ContenedorJerarquia() {
    const [menuItems, setMenuItems] = useState(Jerarquia.convertToMenuItemsAnalisis()); // Estado para los items del menú

    // Suscripción a cambios en la jerarquía
    useEffect(() => {
        // Función que se ejecuta cuando hay un cambio en la jerarquía
        const handleUpdate = () => {
            setMenuItems(Jerarquia.convertToMenuItemsAnalisis()); // Actualiza los items del menú
        };

        // Agregar el listener que actualizará el estado
        Jerarquia.addListener(handleUpdate);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            Jerarquia.removeListener(handleUpdate);
        };
    }, []); // Este effect solo se ejecuta una vez al cargar el componente

    return (
        <Menu theme="dark" mode="inline" id="contenedorJerarquia" items={menuItems}>
            {/* Genera los menús basados en los items actualizados */}
        </Menu>
    );
}

export default ContenedorJerarquia;
