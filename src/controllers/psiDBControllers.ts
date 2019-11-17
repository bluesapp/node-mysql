import { Request, Response } from 'express';
import config from '../config/keysMysql';

// const Request = require("request");
const sql = require("mssql");

class PsiDBController {
    public async list(req: Request, res: Response): Promise<any> {

        let conn
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(`select  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score from PERFORMANCE`)
            console.log('dddd', result.recordset);

            res.send(result.recordset)

            // Stored procedure


        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })

    }

    public async getDesktopFilter(req: Request, res: Response): Promise<any> {

        const { fromDate } = req.params;
        const { toDate } = req.params;
        let conn;
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(
                    `
                    SELECT  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score FROM PERFORMANCE WHERE device = 'desktop' and created BETWEEN '${fromDate}' AND '${toDate} 23:59:59.999' order by id desc
                    `
                )

            res.send(result.recordset)

            // Stored procedure


        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })

    }


    public async getMobileFilter(req: Request, res: Response): Promise<any> {
        const { fromDate } = req.params;
        const { toDate } = req.params;

        let conn;
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(
                    `
                        SELECT  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score FROM PERFORMANCE WHERE device = 'mobile' and created BETWEEN '${fromDate}' AND '${toDate} 23:59:59.999' order by id desc
                    `
                )

            res.send(result.recordset)

        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })
    }

    public async getDevicesFilter(req: Request, res: Response): Promise<any> {
        const { fromDate } = req.params;
        const { toDate } = req.params;
        let conn;
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(
                    `
                             SELECT  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score FROM PERFORMANCE WHERE created BETWEEN '${fromDate}' AND '${toDate} 23:59:59.999' order by id desc
                    `
                )

            res.send(result.recordset)

        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })
    }

    public async getDesktopLimit(req: Request, res: Response): Promise<any> {
        let conn;
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(
                    `
                        select TOP 30  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score from PERFORMANCE  where device = 'desktop' order by id desc;
                    `
                )

            res.send(result.recordset)

        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })
    }

    public async getMobileLimit(req: Request, res: Response): Promise<any> {

        let conn;
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(
                    `
                        select TOP 30  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score from PERFORMANCE  where device = 'mobile' order by id desc;
                    `
                )

            res.send(result.recordset)

        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })
    }

    public async getDevicesLimit(req: Request, res: Response): Promise<any> {
        let conn;
        try {
            conn = await sql.connect(config)
            const result = await conn.request()
                .query(
                    `
                        select TOP 30  id,  created, device, plataforma, locale, first_render_time, total_load_time, total_size, load_without_js, request, score from PERFORMANCE order by id desc;
                    `
                )

            res.send(result.recordset)

        } catch (err) {
            console.log(err);
            res.send(err)

            // ... error checks
        }
        sql.on('error', (err: any) => {
            res.send(err)
        })
    }
}



const psiDBController = new PsiDBController;
export default psiDBController;