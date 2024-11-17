import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db.js';


import categoriasRouter from './Controladores/categoriasControlador.js';
import platillosRouter from './Controladores/platillosControlador.js';

const app = express();

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios


// Rutas
app.use('/api/categorias', categoriasRouter);
app.use('/api/platillos', platillosRouter);



// Exportamos la app para que `index.js` la use
export default app;