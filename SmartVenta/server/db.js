import pkg from 'pg'; // Importa el paquete completo
const { Pool } = pkg; // Extrae la clase Pool del paquete

const pool = new Pool({
    user: 'postgres',
    host: process.env.PG_HOST,
    database: 'SmartVentas',
    password: '123',
    port: process.env.PG_PORT,
  });

export default pool; // Exporta pool como ES Module


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa:', res.rows[0]);
    }
  });