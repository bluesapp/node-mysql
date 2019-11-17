import { Request, Response } from 'express';
const Request = require("request");
import config from '../config/keysMysql';
const sql = require("mssql");




const urlParams = {
    url: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
    psiUrl: 'https://www.homecenter.com.co/',   /* 'https://www.htcss.com/latam', */
    key: 'AIzaSyCOy50CO_u6gKQm4_y2buoAKTRJ-r_cAM4',
    locale: 'es-CO',
    category: {
        1: 'performance'
    },
    strategy: {
        1: 'desktop',
        2: 'mobile'
    }

}

// https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.homecenter.com.co&key=AIzaSyCOy50CO_u6gKQm4_y2buoAKTRJ-r_cAM4&category=performance&strategy=mobile



class PsiController {

    public async getApiGoogleDesktop(req: Request, res: Response) {
        let i: number = 0;
        console.log('Consumiendo API Google Desktop... ');

        let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[1]}&locale=${urlParams.locale}`;
        let conn;

        await Request.get(url, (error: any, response: any, body: any) => {
            if (error) {
                return console.dir('prueba', error);
            }
            const data = JSON.parse(body);

            let device: string = data.lighthouseResult.configSettings.emulatedFormFactor;
            let locale: string = data.lighthouseResult.configSettings.locale;
            let first_render_time: number = data.lighthouseResult.audits.metrics.details.items[0].firstContentfulPaint;
            let total_load_time: number = data.lighthouseResult.audits.metrics.details.items[0].interactive;
            let total_size: number = data.lighthouseResult.audits.diagnostics.details.items[0].totalByteWeight;
            let load_without_js: number = data.lighthouseResult.audits.metrics.details.items[0].observedDomContentLoaded;
            let request: number = data.lighthouseResult.audits.diagnostics.details.items[0].numRequests;
            let score: string = data.lighthouseResult.categories.performance.score;
            async function getData() {
                try {
                    // 
                    conn = await sql.connect(config)
                    const result = await conn.request()
                        .query(
                            `
                        insert into PERFORMANCE(
                            device,
                            plataforma,
                            locale,
                            first_render_time,
                            total_load_time,
                            total_size,
                            load_without_js,
                            request,
                            score
                        )values(
                                '${device}',
                                'PSI',
                                '${locale}',
                                ${first_render_time},
                                ${total_load_time},
                                ${total_size},
                                ${load_without_js},
                                ${request},
                                '${score}'
                            )
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
                });
            }
            getData();
        });


    } /* codigo funcional sin retorno de errores */



    /**** Consumir Api de Goole Mobile */
    public async  getApiGoogleMobile(req: Request, res: Response) {
        console.log('Consumiendo API Google Mobile... ');
        let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[2]}&locale=${urlParams.locale}`;
        let conn
        await Request.get(url, (error: any, response: any, body: any) => {

            if (error) {
                return console.dir('prueba', error);
            }

            let data = JSON.parse(body);


            let device: string = data.lighthouseResult.configSettings.emulatedFormFactor;
            let locale: string = data.lighthouseResult.configSettings.locale;
            let first_render_time: number = data.lighthouseResult.audits.metrics.details.items[0].firstContentfulPaint;
            let total_load_time: number = data.lighthouseResult.audits.metrics.details.items[0].interactive;
            let total_size: number = data.lighthouseResult.audits.diagnostics.details.items[0].totalByteWeight;
            let load_without_js: number = data.lighthouseResult.audits.metrics.details.items[0].observedDomContentLoaded;
            let request: number = data.lighthouseResult.audits.diagnostics.details.items[0].numRequests;
            let score: string = data.lighthouseResult.categories.performance.score;

            async function getData() {
                try {
                    // 
                    conn = await sql.connect(config)
                    const result = await conn.request()
                        .query(
                            `
                        insert into PERFORMANCE(
                            device,
                            plataforma,
                            locale,
                            first_render_time,
                            total_load_time,
                            total_size,
                            load_without_js,
                            request,
                            score
                        )values(
                                '${device}',
                                'PSI',
                                '${locale}',
                                ${first_render_time},
                                ${total_load_time},
                                ${total_size},
                                ${load_without_js},
                                ${request},
                                '${score}'
                            )
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
                });
            }
            getData();
        });
    }

};

const psiController = new PsiController;
export default psiController;






