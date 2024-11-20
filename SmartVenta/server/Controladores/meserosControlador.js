import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Ruta para obtener todos los meseros
router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM staff WHERE cargo = 'Mesero/a';`;
        const result = await pool.query(query);

        res.status(200).json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error al obtener meseros:', error);
        res.status(500).json({ error: 'Error al obtener los meseros' });
    }
});

export default router;