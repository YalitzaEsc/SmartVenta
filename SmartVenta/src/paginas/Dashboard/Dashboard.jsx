import './Dashboard.css';
const Dashboard = () => {
    return (
        
        <div className="container">
            <header className="container-header">
                <h2>Dashboard</h2>
            </header>

            <section className="resumen">
                <div className="card">
                    <h3>Ventas</h3>
                    <p>$12k</p>
                </div>
                <div className="card">
                    <h3>Ganancias</h3>
                    <p>$15k</p>
                </div>
                <div className="card">
                    <h3>Mesas Ocupadas</h3>
                    <p>25</p>
                </div>
            </section>

            <section className="card">
                <h3>Platos Populares</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Ventas</th>
                            <th>Ganancias</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="dish.jpg" alt="Plato" width={50} /></td>
                            <td>Pizza Margarita</td>
                            <td>120</td>
                            <td>$1,200</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="card">                
                <h3>Resumen de Ventas</h3>
                <div className="chart">
                    <img src="chart-placeholder.jpg" alt="Gráfico de Resumen" />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;