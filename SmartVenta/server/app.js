import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db.js';


import categoriasRouter from './Controladores/categoriasControlador.js';
import platillosRouter from './Controladores/platillosControlador.js';
import staffRouter from './Controladores/staffControlador.js';
import asistenciaRouter from './Controladores/asistenciaControlador.js';
import meserosRouter from './Controladores/meserosControlador.js';
import ordenesRouter from './Controladores/ordenesControlador.js';
import dashboardRouter from './Controladores/dashboardControlador.js';

const app = express();

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios


// Rutas
app.use('/api/categorias', categoriasRouter);
app.use('/api/platillos', platillosRouter);
app.use('/api/staff', staffRouter);
app.use('/api/meseros', meserosRouter);
app.use('/api', asistenciaRouter);
app.use('/api/ordenes', ordenesRouter);
app.use('/api/dashboard', dashboardRouter);


export default app;