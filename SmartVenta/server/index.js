import dotenv from 'dotenv';
import app from './app.js';

dotenv.config(); // Para usar variables de entorno
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});