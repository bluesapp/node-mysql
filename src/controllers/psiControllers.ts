import { Request, Response } from 'express';
const Request = require("request");


import pool from '../database/mysqlDB';


const urlParams = {
    url: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
    psiUrl: 'https://www.htcss.com/latam'/* 'https://www.homecenter.com.co/' *//* 'https://asistencia.webv2.allus.com.co/WebAPI802/ChatSodimac/AdvancedChat/formchaty.jsp' */,
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
    
    


/* **** Codigo en pruebas **** */


    public async getApiGoogleDesktop(req: Request, res: Response, next: any) {
        try {
            
       
        let i: number = 0;
        
        const data = await makeRequest(i)
        console.log(data.lighthouseResult.configSettings.emulatedFormFactor);
        return res.send(data.lighthouseResult.configSettings.emulatedFormFactor)
        
        
        async function makeRequest(i: number) {
            console.log('consumiendo Api, Intento', i + 1);
            
            return new Promise<any>((resolve, reject) => {
                let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[1]}&locale=${urlParams.locale}`;
                Request.get(url, (error: any, response: any, body: any) => {
                  
                    
                    let data = JSON.parse(body)
                    if (data.error ) {
                        console.log(data.error.code)
                        i++
                        // clearInterval();
                        // return makeRequest(i);
                        return reject(data)
                    // } else if (data.error && i == 1 ) {
                    //     console.log('entro en else if');
                    //     clearInterval();
                    //     return resolve(data)
                    } 
                        console.log('valor de i', i);
                        return resolve(data.error)

                    
                    // ...
        
                })

            })
        } } catch (error) {
            next(error)
        }
    }  /* **** Codigo de prueba con async y promesas **** */

    // public async getApiGoogleDesktop(req: Request, res: Response) {
    //     let i: number = 0;
    //     console.log('Consumiendo API Google Desktop... ');

    //     let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[1]}&locale=${urlParams.locale}`;


    //     await Request.get(url, (error: any, response: any, body: any) => {

    //         const data = JSON.parse(body);

    //         // if (data.error.code) {
    //         //     console.log('entra al if', data.error.code);
    //         //     aa++

    //         // }
    //         // console.log('cc',i);

    //         // i++
    //         let device: string = data.lighthouseResult.configSettings.emulatedFormFactor;
    //         let locale: string = data.lighthouseResult.configSettings.locale;
    //         let first_render_time: number = data.lighthouseResult.audits.metrics.details.items[0].firstContentfulPaint;
    //         let total_load_time: number = data.lighthouseResult.audits.metrics.details.items[0].interactive;
    //         let total_size: number = data.lighthouseResult.audits.diagnostics.details.items[0].totalByteWeight;
    //         let load_without_js: number = data.lighthouseResult.audits.metrics.details.items[0].observedDomContentLoaded;
    //         let request: number = data.lighthouseResult.audits.diagnostics.details.items[0].numRequests;
    //         let score: string = data.lighthouseResult.categories.performance.score;

    //         pool.query(
    //             `
    //                 insert into datos(
    //                     device,
    //                     platform,
    //                     locale,
    //                     first_render_time,
    //                     total_load_time,
    //                     total_size,
    //                     load_without_js, 
    //                     request,
    //                     score
    //                 )
    //                 values(
    //                     '${device}',
    //                     'PSI',
    //                     '${locale}',
    //                     ${first_render_time},
    //                     ${total_load_time},
    //                     ${total_size},
    //                     ${load_without_js},
    //                     ${request},
    //                     '${score}'
    //                 )
    //                 `
    //         );
    //         console.log('finaliza');

    //         return res.send(data);
    //     });
    // } /* codigo funcional sin retorno de errores */











    /**** Consumir Api de Goole Mobile */
    public async  getApiGoogleMobile(req: Request, res: Response) {
        console.log('Consumiendo API Google Mobile... ');
        let url = `${urlParams.url}?url=${urlParams.psiUrl}&key=${urlParams.key}&category=${urlParams.category[1]}&strategy=${urlParams.strategy[2]}&locale=${urlParams.locale}`;

        await Request.get(url, (error: any, response: any, body: any) => {

            if (error) {
                return console.dir('prueba', error);
            }

            let data =  JSON.parse(body);


            let device: string = data.lighthouseResult.configSettings.emulatedFormFactor;
            let locale: string = data.lighthouseResult.configSettings.locale;
            let first_render_time: number = data.lighthouseResult.audits.metrics.details.items[0].firstContentfulPaint;
            let total_load_time: number = data.lighthouseResult.audits.metrics.details.items[0].interactive;
            let total_size: number = data.lighthouseResult.audits.diagnostics.details.items[0].totalByteWeight;
            let load_without_js: number = data.lighthouseResult.audits.metrics.details.items[0].observedDomContentLoaded;
            let request: number = data.lighthouseResult.audits.diagnostics.details.items[0].numRequests;
            let score: string = data.lighthouseResult.categories.performance.score;

            pool.query(
                `
                insert into datos(
                    device,
                    platform,
                    locale,
                    first_render_time,
                    total_load_time,
                    total_size,
                    load_without_js, 
                    request,
                    score
                )
                values(
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
            ),
                console.log('finaliza');

            return res.send();
        });
    }

};

const psiController = new PsiController;
export default psiController;






