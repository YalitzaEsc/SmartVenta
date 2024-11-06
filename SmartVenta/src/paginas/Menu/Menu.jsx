import './Menu.css';
import {Banana, CookingPot, Beer, CakeSlice, Soup, Salad} from 'lucide-react'

const Menu = () => {
    // Mock data para categorías
    const categorias = [
        { id: 1, name: 'Entradas', icon: <Banana /> },
        { id: 2, name: 'Platos Fuertes', icon: <CookingPot /> },
        { id: 3, name: 'Bebidas', icon: <Beer />  },
        { id: 4, name: 'Postres', icon: <CakeSlice /> },
        { id: 5, name: 'Sopas', icon: <Soup />  },
        { id: 6, name: 'Ensaladas', icon: <Salad /> }
    ];

    
    const platillos = [
        {
            id: 1,
            name: 'Ensalada César',
            price: 10.99,
            description: 'Lechuga romana fresca, crutones, queso parmesano ',
            category: 'Ensaladas',
        },
        {
            id: 2,
            name: 'Lomo Saltado',
            price: 18.99,
            description: 'Tiras de lomo fino salteadas con cebolla, tomate y papas fritas',
            category: 'Platos Fuertes',
        },
        {
            id: 3,
            name: 'Crema de Champiñones',
            price: 8.99,
            description: 'Cremosa sopa de champiñones frescos con un toque de hierbas',
            category: 'Sopas',
        },
        {
            id: 4,
            name: 'Limonada de Frutos Rojos',
            price: 4.99,
            description: 'Refrescante limonada con mezcla de frutos rojos',
            category: 'Bebidas',
        },
        {
            id: 5,
            name: 'Tiramisú',
            price: 7.99,
            description: 'Postre italiano tradicional con café y mascarpone',
            category: 'Postres',
        }
    ];

    const handleEditDish = (id) => {
        console.log('Editando plato:', id);
    };

    const handleDeleteDish = (id) => {
        console.log('Eliminando plato:', id);
    };

    const handleAddCategory = () => {
        console.log('Agregando nueva categoría');
    };

    return (
        <div className="container">
            <header className="container-header">
                <h2>Menú</h2>
            </header>

            <section className="">
                <div className="card-header">
                    <h2>Categorías</h2>
                    <button className="add-button" onClick={handleAddCategory}>
                        + Agregar Categoría
                    </button>
                </div>
                <div className="grid">
                    {categorias.map((category) => (
                        <div key={category.id} className="category-card">
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="card">
                <div className="table-header">
                    <h2>Lista de Platos</h2>
                    <button className="add-button">
                        + Agregar Plato
                    </button>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {platillos.map((dish) => (
                                <tr key={dish.id}>
                                    <td>{dish.name}</td>
                                    <td>{dish.category}</td>
                                    <td>${dish.price.toFixed(2)}</td>
                                    <td>{dish.description}</td>
                                    <td>
                                        <div className="action-buttons">
                                        <button 
                                            className="edit-button"
                                            onClick={() => handleEditDish(dish.id)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDeleteDish(dish.id)}
                                        >
                                            Eliminar
                                        </button>
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Menu;