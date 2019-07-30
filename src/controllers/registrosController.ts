import { Request, Response } from 'express';


import pool from '../database';

class RegistrosController {

    public async list(req: Request, res: Response): Promise<void> {
        const registros = await pool.query('SELECT * FROM registros');
        res.json(registros);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const registros = await pool.query('SELECT * FROM registros WHERE id = ?', [id]);
        console.log(registros.length);
        if (registros.length > 0) {
            return res.json(registros[0]);
        }
        res.status(404).json({ text: "Registro no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO registros set ?', [req.body]);
        res.json({ message: 'Registro guardado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE registros set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "El registro ha sido actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM registros WHERE id = ?', [id]);
        res.json({ message: "El registro a sido eliminado" });
    }
}

const registrosController = new RegistrosController;
export default registrosController;