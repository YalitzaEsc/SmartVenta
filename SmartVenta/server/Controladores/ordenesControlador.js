import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Ruta para insertar una orden
router.post("/insertar-orden", async (req, res) => {
  const { id_staff, numero_mesa, estado, detalles } = req.body;

  try {
    const query = `
      SELECT insertar_orden_completa($1, $2, $3, $4::jsonb);
    `;
    const values = [id_staff, numero_mesa, estado, JSON.stringify(detalles)];

    await pool.query(query, values);

    res.status(201).json({ success: true, message: "Orden creada exitosamente" });
  } catch (error) {
    console.error("Error al insertar la orden:", error);
    res.status(500).json({ success: false, message: "Error al insertar la orden" });
  }
});


// Ruta para obtener las órdenes del día actual
router.get("/ordenes-dia-actual", async (req, res) => {
    try {
      const query = `
        SELECT 
            o.id_orden,
            o.numero_orden_dia,
            o.numero_orden_total,
            o.fecha,
            o.hora,
            o.numero_mesa,
            o.subtotal,
            o.estado,
            s.nombre_completo AS mesero,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id_platillo', d.id_platillo,
                    'nombre', p.nombre,
                    'precio', p.precio,
                    'cantidad', d.cantidad,
                    'total_por_platillo', (p.precio * d.cantidad)
                )
            ) AS detalles
        FROM 
            orden o
        JOIN 
            staff s ON o.id_staff = s.id_staff
        JOIN 
            detalle_orden d ON o.id_orden = d.id_orden
        JOIN 
            platillos p ON d.id_platillo = p.id_platillo
        WHERE 
            o.fecha = CURRENT_DATE
        GROUP BY 
            o.id_orden, s.nombre_completo
        ORDER BY 
            o.hora DESC;
      `;
  
      const result = await pool.query(query);
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error al obtener las órdenes del día actual:", error);
      res.status(500).json({ success: false, message: "Error al obtener las órdenes del día actual" });
    }
  });


  // Ruta para actualizar el estado de una orden a "Listo"
router.put("/:id/listo", async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = `
        UPDATE orden
        SET estado = 'Listo'
        WHERE id_orden = $1;
      `;
      await pool.query(query, [id]);
  
      res.status(200).json({ success: true, message: "Orden actualizada a 'Listo'" });
    } catch (error) {
      console.error("Error al actualizar la orden a 'Listo':", error);
      res.status(500).json({ success: false, message: "Error al actualizar la orden a 'Listo'" });
    }
  });
  
  // Ruta para actualizar el estado de una orden a "Completado"
  router.put("/:id/completado", async (req, res) => {
    const { id } = req.params;

    try {
      const query = `
        UPDATE orden
        SET estado = 'Completado'
        WHERE id_orden = $1;
      `;
      await pool.query(query, [id]);
  
      res.status(200).json({ success: true, message: "Orden actualizada a 'Completado'" });
    } catch (error) {
      console.error("Error al actualizar la orden a 'Completado':", error);
      res.status(500).json({ success: false, message: "Error al actualizar la orden a 'Completado'" });
    }
});

// Ruta para eliminar una orden
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = `
        DELETE FROM orden
        WHERE id_orden = $1;
      `;
      await pool.query(query, [id]);
  
      res.status(200).json({ success: true, message: "Orden eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      res.status(500).json({ success: false, message: "Error al eliminar la orden" });
    }
  });

export default router;


