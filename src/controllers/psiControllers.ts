import { Request, Response } from 'express';
import config from '../config/keysMysql';
// const Request = require("request");
const sql = require("mssql");

const request = require('request');




const urlParams = {
    url: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
    psiUrl: 'https://www.homecenter.com.co/',  // 'https://www.htcss.com/latam',
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

        console.log(new Date(), '--- Consumiendo API Google Desktop... ');
        let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[1]}&locale=${urlParams.locale}`;
        let conn;

        await request.get(url, function (error: any, response: any, body: any) {
            if (error) { // error del request
                console.log('Error request', error);

                return res.sendStatus(error);
            }

            const data = JSON.parse(body);

            if (data.error) { // error API
                return res.sendStatus(data.error.code);
            } else {
                // Logica si todo sale bien
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
                        console.log('Finalizó bien')
                        res.send(result.recordset)
                    } catch (err) {
                        console.log('Error Catch', err);
                        res.send(err)

                        // ... error checks
                    }

                    sql.on('error', (err: any) => {
                        console.log('error sql on', err);

                        res.send(err)
                    });
                }
                getData();
            }
        });


    }


    /**** Consumir Api de Goole Mobile */
    public async  getApiGoogleMobile(req: Request, res: Response) {
        console.log(new Date(), '--- Consumiendo API Google Mobile... ');
        let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[2]}&locale=${urlParams.locale}`;
        let conn

        await request.get(url, function (error: any, response: any, body: any) {
            if (error) { // error del request
                console.log('Error request', error);

                return res.sendStatus(error);
            }

            const data = JSON.parse(body);

            if (data.error) { // error API
                return res.sendStatus(data.error.code);
            } else {
                // Logica si todo sale bien
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
                        console.log('Finalizó bien')
                        res.send(result.recordset)
                    } catch (err) {
                        console.log('Error Catch', err);
                        res.send(err)

                        // ... error checks
                    }

                    sql.on('error', (err: any) => {
                        console.log('error sql on', err);

                        res.send(err)
                    });
                }
                getData();
            }
        });


    }
};

const psiController = new PsiController;
export default psiController;






