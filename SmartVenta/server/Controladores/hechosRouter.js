import { Router } from 'express';
import pool from '../db.js';



const router = Router();


const getTablaHechos = async (reg, res) => {
    const { query } = reg.params;
    const allTasks = await pool.query(query);
    res.json(allTasks.rows)
}


//const getTasks = async (req, res) => {
//    const { id } = req.params;
//    const result = await pool.query("SELECT * FROM FECHA WHERE año=$1", [id]);
//    console.log(result);
//    res.json(result.rows);
//}

export default getTablaHechos;