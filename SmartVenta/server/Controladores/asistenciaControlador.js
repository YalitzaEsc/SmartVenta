import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Ruta para obtener la asistencia del día actual
router.get('/asistencia', async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    // Obtener todos los empleados
    const empleadosQuery = `SELECT id_staff, nombre_completo, cargo FROM staff`;
    const empleados = await pool.query(empleadosQuery);

    // Obtener asistencia del día actual
    const asistenciaQuery = `
      SELECT 
        a.id_asistencia AS id,
        s.id_staff,
        s.nombre_completo AS nombre,
        s.cargo,
        a.fecha,
        a.estatus
      FROM asistencia a
      JOIN staff s ON a.id_staff = s.id_staff
      WHERE a.fecha = $1;
    `;

    const asistenciaHoy = await pool.query(asistenciaQuery, [currentDate]);

    // Determinar empleados sin asistencia registrada
    const empleadosSinAsistencia = empleados.rows.filter((empleado) =>
      !asistenciaHoy.rows.some((asistencia) => asistencia.id_staff === empleado.id_staff)
    );

    // Insertar registros de asistencia "No presente" para los empleados sin asistencia
    if (empleadosSinAsistencia.length > 0) {
      const insertarAsistenciaQuery = `
        INSERT INTO asistencia (id_staff, fecha, estatus)
        VALUES ${empleadosSinAsistencia
          .map(() => `($1, $2, 'No presente')`)
          .join(", ")}
        RETURNING id_asistencia, id_staff, fecha, estatus;
      `;
      const values = empleadosSinAsistencia.flatMap((empleado) => [
        empleado.id_staff,
        currentDate,
      ]);

      await pool.query(insertarAsistenciaQuery, values);
    }

    // Obtener la asistencia actualizada del día
    const asistenciaActualizada = await pool.query(asistenciaQuery, [currentDate]);

    res.status(200).json(asistenciaActualizada.rows);
  } catch (error) {
    console.error('Error al obtener datos de asistencia:', error);
    res.status(500).json({ error: 'Error al obtener datos de asistencia' });
  }
});

// Ruta para actualizar el estado de asistencia
router.put('/asistencia/:id', async (req, res) => {
  const { id } = req.params;
  const { estatus } = req.body;

  if (!estatus) {
    return res.status(400).json({ error: 'El campo estatus es obligatorio' });
  }

  try {
    const query = `
      UPDATE asistencia
      SET estatus = $1
      WHERE id_asistencia = $2
      RETURNING *;
    `;
    const values = [estatus, id];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Registro de asistencia no encontrado' });
    }

    res.status(200).json({
      message: 'Estatus actualizado correctamente',
      asistencia: result.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar estatus de asistencia:', error);
    res.status(500).json({ error: 'Error al actualizar estatus de asistencia' });
  }
});

export default router;