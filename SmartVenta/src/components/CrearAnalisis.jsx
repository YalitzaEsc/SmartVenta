import ContenedorJerarquia from "./ContenedorJerarquia.jsx";
import ContenedorTablas from "./ContenedorTablas.jsx";
import '../styles/CrearAnalisis.css'

function CrearAnalisis() {
  return (
    <div id="contenedor">
      <ContenedorJerarquia/>
      <ContenedorTablas />
    </div>
  );
}

export default CrearAnalisis;