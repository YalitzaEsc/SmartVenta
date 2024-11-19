import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Ruta para obtener todos los platillos
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_platillo, 
        p.nombre AS nombre_platillo, 
        p.cantidad_stock,
        p.precio, 
        p.calorias, 
        p.disponibilidad, 
        c.nombre AS nombre_categoria
      FROM platillos p
      JOIN categoria_menu c ON p.id_categoria = c.id_categoria
      ORDER BY p.nombre;
    `;
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener platillos:', error);
    res.status(500).json({ error: 'Error al obtener los platillos' });
  }
});

// Ruta para insertar un nuevo platillo
router.post('/', async (req, res) => {
  const { nombre, categoria, precio, costo, calorias, cantidad_stock, disponibilidad } = req.body;

  try {
    if (!nombre || !categoria || !precio || !costo || !cantidad_stock || !disponibilidad || !calorias) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const query = `
      INSERT INTO platillos (nombre, id_categoria, cantidad_stock, costo, precio, disponibilidad, calorias)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      nombre,
      parseInt(categoria, 10),
      parseInt(cantidad_stock, 10),
      parseFloat(costo),
      parseFloat(precio),
      disponibilidad,
      parseInt(calorias, 10),
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Platillo creado exitosamente',
      platillo: result.rows[0],
    });
  } catch (error) {
    console.error('Error al insertar platillo:', error);
    res.status(500).json({ error: 'Error al crear el platillo' });
  }
});

export default router;