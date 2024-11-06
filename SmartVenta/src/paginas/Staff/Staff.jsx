import './Staff.css';

const Staff = () => {
    // Mock data array con 10 empleados
    const data = [
        {
            id: 1,
            name: "Gonzalo Gonzales",
            position: "Cocinero",
            email: "juan@example.com",
            phone: "+1 123 456 7890"
        },
        {
            id: 2,
            name: "Pedro Paramo",
            position: "Mesera",
            email: "maria@example.com",
            phone: "+1 123 456 7891"
        },
        {
            id: 3,
            name: "López López",
            position: "Bartender",
            email: "carlos@example.com",
            phone: "+1 123 456 7892"
        },
        {
            id: 4,
            name: "Ana Martínez",
            position: "Host",
            email: "ana@example.com",
            phone: "+1 123 456 7893"
        },
        {
            id: 5,
            name: "Roberto Sánchez",
            position: "Chef Ejecutivo",
            email: "roberto@example.com",
            phone: "+1 123 456 7894"
        },
        {
            id: 6,
            name: "Laura Torres",
            position: "Sous Chef",
            email: "laura@example.com",
            phone: "+1 123 456 7895"
        },
        {
            id: 7,
            name: "Diego Ramírez",
            position: "Mesero",
            email: "diego@example.com",
            phone: "+1 123 456 7896"
        },
        {
            id: 8,
            name: "Patricia Flores",
            position: "Cajera",
            email: "patricia@example.com",
            phone: "+1 123 456 7897"
        },
        {
            id: 9,
            name: "Miguel Herrera",
            position: "Limpieza",
            email: "miguel@example.com",
            phone: "+1 123 456 7898"
        },
        {
            id: 10,
            name: "Sofia Vargas",
            position: "Administradora",
            email: "sofia@example.com",
            phone: "+1 123 456 7899"
        }
    ];

    const handleEdit = (id) => {
        console.log('Editando empleado:', id);
    };

    const handleDelete = (id) => {
        console.log('Eliminando empleado:', id);
    };

    return (
        <div className="container">
            <header className="container-header">
                <h2>Gestión de Personal</h2>
            </header>

            <div className="card">
                <div className="card-header">
                    <h3>Lista de Personal</h3>
                    <button className="add-button">
                        + Agregar Personal
                    </button>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cargo</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>
                                        <div className="action-buttons">
                                        <button 
                                            className="edit-button"
                                            onClick={() => handleEdit(employee.id)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(employee.id)}
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
            </div>
        </div>
    );
}

export default Staff;