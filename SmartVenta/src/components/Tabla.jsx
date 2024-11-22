import Jerarquia from '../Classes/Jerarquia.jsx'
import '../styles/Tabla.css'


function Tabla({ id, nombreTabla, columnas }) {
    return (
        <div className="tabla" id={id}>
            <h3>{nombreTabla}</h3>
            {columnas.map((col, index) => (
                <button className="columna" key={index} onClick={() => Jerarquia.agregarNivel(col)} >{col}</button>
            ))}
        </div>

    );
}

export default Tabla;