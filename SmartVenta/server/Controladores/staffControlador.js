import { Router } from 'express';
import pool from '../db.js';

const router = Router();



// Ruta para obtener los empleados
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT * FROM staff
            ORDER BY nombre_completo;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Error al obtener personal:', error);
        res.status(500).json({ error: 'Error al obtener el personal' });
    }
});



// Ruta para registrar a los empleados
router.post('/', async (req, res) => {

    const { nombre, correo, rol, telefono, salario, fechaDeNacimiento, horarioInicio, horarioFinal, direccion } = req.body;

    try {
        if (!nombre || !correo || !rol || !telefono || !salario || !fechaDeNacimiento || !horarioInicio || !horarioFinal || !direccion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        } 

        const horario = 'De ' + horarioInicio + ' a ' + horarioFinal;

        const query = `
            INSERT INTO staff (nombre_completo, correo, cargo, telefono, salario, fecha_nacimiento, horario, direccion)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [
            nombre,
            correo,
            rol,
            telefono,
            salario,
            fechaDeNacimiento,
            horario,
            direccion,
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Personal registrado exitosamente',
            staff: result.rows[0],
        });

    } catch (error) {
        console.error('Error al registrar personal:', error);
        res.status(500).json({ error: 'Error al registrar el personal' });
    }
});

// Ruta para borrar a los empleados
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Eliminar asistencia relacionada
        const deleteAsistenciaQuery = `
            DELETE FROM asistencia
            WHERE id_staff = $1;
        `;
        await pool.query(deleteAsistenciaQuery, [id]);

        // Eliminar empleado
        const deleteStaffQuery = `
            DELETE FROM staff
            WHERE id_staff = $1
            RETURNING *;
        `;
        const result = await pool.query(deleteStaffQuery, [id]);

        res.status(200).json({
            message: 'Personal eliminado exitosamente',
            staff: result.rows[0],
        });
    } catch (error) {
        console.error('Error al eliminar personal:', error);
        res.status(500).json({ error: 'Error al eliminar el personal' });
    }
});

export default router;