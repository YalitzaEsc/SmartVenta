import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Ruta para obtener datos del dashboard semanal
router.get('/', async (req, res) => {
    try {
        const query = `
            WITH top_ventas AS (
                SELECT 
                    p.nombre,
                    SUM(d.cantidad) AS total_ventas,
                    SUM(d.cantidad * (p.precio - p.costo)) AS total_ganancias
                FROM detalle_orden d
                JOIN platillos p ON d.id_platillo = p.id_platillo
                JOIN orden o ON d.id_orden = o.id_orden
                WHERE o.fecha >= DATE_TRUNC('week', CURRENT_DATE)
                GROUP BY p.nombre
                ORDER BY total_ventas DESC
                LIMIT 5
            ),
            low_ventas AS (
                SELECT 
                    p.nombre,
                    SUM(d.cantidad) AS total_ventas,
                    SUM(d.cantidad * (p.precio - p.costo)) AS total_ganancias
                FROM detalle_orden d
                JOIN platillos p ON d.id_platillo = p.id_platillo
                JOIN orden o ON d.id_orden = o.id_orden
                WHERE o.fecha >= DATE_TRUNC('week', CURRENT_DATE)
                GROUP BY p.nombre
                ORDER BY total_ventas ASC
                LIMIT 5
            ),
            ventas_diarias AS (
                SELECT 
                    DATE_TRUNC('day', o.fecha) AS dia,
                    SUM(o.subtotal) AS ventas_totales_dia,
                    SUM(o.subtotal) - SUM(p.costo * d.cantidad) AS ganancias_dia,
                    COUNT(DISTINCT o.numero_mesa) AS mesas_ocupadas_dia
                FROM orden o 
                JOIN detalle_orden d ON o.id_orden = d.id_orden
                JOIN platillos p ON d.id_platillo = p.id_platillo
                WHERE o.fecha >= DATE_TRUNC('week', CURRENT_DATE)
                GROUP BY DATE_TRUNC('day', o.fecha)
                ORDER BY dia
            )
            SELECT 
                v.dia,
                v.ventas_totales_dia,
                v.ganancias_dia,
                v.mesas_ocupadas_dia,
                (SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'nombre', t.nombre,
                        'ventas', t.total_ventas,
                        'ganancias', t.total_ganancias
                    )
                ) FROM top_ventas t) AS platillos_populares,
                (SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'nombre', l.nombre,
                        'ventas', l.total_ventas,
                        'ganancias', l.total_ganancias
                    )
                ) FROM low_ventas l) AS platillos_menos_vendidos
            FROM ventas_diarias v;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener datos del dashboard semanal:', error);
        res.status(500).json({ error: 'Error al obtener los datos del dashboard semanal' });
    }
});

export default router;