import './Reservas.css';

const data = [
  {
    hour: "12:00",
    days: ["Reservado", "Disponible", "Reservado", "Disponible", "Reservado", "Disponible", "Reservado"],
  },
  {
    hour: "13:00",
    days: ["Disponible", "Reservado", "Disponible", "Reservado", "Disponible", "Reservado", "Disponible"],
  },
];

const Reservas = () => {
  return (
    <div className="container">
      <header className="container-header">
        <h2>Reservas</h2>
      </header>
      <div className="card">
        <div className="card-header">
          <h3>Calendario de Reservas</h3>
          <button className="add-button">Agregar Reserva</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
                <th>Domingo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.hour}</td>
                  {reservation.days.map((status, dayIndex) => (
                    <td key={dayIndex}>{status}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservas;
