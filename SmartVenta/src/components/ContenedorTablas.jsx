import Tabla from './Tabla.jsx';
import '../styles/ContenedorTablas.css'
function ContenedorTablas() {
    return (
        <div id="contenedorTablas">
            <Tabla
                id='fecha'
                nombreTabla='Fecha'
                columnas={['Año', 'Mes', 'Dia', 'Mes por nombre', 'Semana del mes', 'Dia de la semana']}
            />
            <Tabla
                id='prodcuto'
                nombreTabla='Producto'
                columnas={['Nombre', 'Tipo', 'Categoria']}
            />
            <Tabla
                id='mesero'
                nombreTabla='Mesero'
                columnas={['Iniciales', 'Tiempo trabajando']}
            />
        </div>
    );
}


export default ContenedorTablas;