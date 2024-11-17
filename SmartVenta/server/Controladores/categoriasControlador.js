import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Ruta para insertar una nueva categoría
router.post('/', async (req, res) => {
    const { nombre, menu, descripcion } = req.body;
  
    try {
      const query = `
        INSERT INTO public.categoria_menu (nombre, tipo_menu, descripcion)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [nombre, menu, descripcion];
      console.log('Ejecutando consulta:', query, values);
  
      const result = await pool.query(query, values);
      res.status(201).json({
        message: 'Categoría creada exitosamente',
        categoria: result.rows[0],
      });
    } catch (error) {
      console.error('Error al insertar categoría:', error);
      res.status(500).json({ error: 'Error al crear la categoría' });
    }
  });

  // Ruta para obtener categorías
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT id_categoria, nombre, tipo_menu, descripcion FROM categoria_menu ORDER BY nombre';
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

export default router;