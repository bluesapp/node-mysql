import { Request, Response } from 'express';
const Request = require("request");


import pool from '../database/mysqlDB';

class PsiDBController {
    public async list(req: Request, res: Response): Promise<any> {
        const datos = await pool.query(
            `
            select * from datos;
            `
        );
        res.json(datos)
    }
    public async getDesktopFilter(req: Request, res: Response): Promise<any> {
        const { fromDate } = req.params;
        const { toDate } = req.params;
        console.log(fromDate);
        console.log(toDate);

        const datos = await pool.query(
            `
            SELECT * FROM datos WHERE device = 'desktop' and (DATE_FORMAT(created,'%Y/%m/%d') BETWEEN STR_TO_DATE('${fromDate}','%Y-%m-%d') AND STR_TO_DATE('${toDate}','%Y-%m-%d')) order by id desc
            `
        );
        res.json(datos);
    }

    public async getMobileFilter(req: Request, res: Response): Promise<any> {
        const { fromDate } = req.params;
        const { toDate } = req.params;
        console.log(fromDate);

        const datos = await pool.query(
            `
            SELECT * FROM datos WHERE device = 'mobile' and (DATE_FORMAT(created,'%Y/%m/%d') BETWEEN STR_TO_DATE('${fromDate}','%Y-%m-%d') AND STR_TO_DATE('${toDate}','%Y-%m-%d')) order by id desc
            `
        );
        res.json(datos);
    }

    public async getDesktopLimit(req: Request, res: Response): Promise<any> {
        const datos = await pool.query(
            `
             select *  from datos  where device = 'desktop' order by id desc limit 30;
            `
        );
        res.json(datos);
    }
    public async getMobileLimit(req: Request, res: Response): Promise<any> {
        const datos = await pool.query(
            `
             select *  from datos  where device = 'mobile' order by id desc  limit 30;
            `
        );
        res.json(datos);
    }
}



const psiDBController = new PsiDBController;
export default psiDBController;