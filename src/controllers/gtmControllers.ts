// import express, { Request, Response } from 'express';
// const app = express();

// import pool from '../database/mysqlDB';


// // Credenciales para conectarse a GTMetrix
// const gtmetrix = require('gtmetrix')({
//     email: 'rafael.pereira@scisoftware.co',
//     apikey: 'f6ecd48363ef3d7617fe7c25fb1b0f25',
//     timeout: 10000
// });




// class GtmController {
//     public async getApiGTMetrix(req: Request, res: Response): Promise <any> {
//         console.log('entra 1');
        
//         const datosGtm = await gtmetrix.test.get('DU6hhUci', 5000);
//         const prueba2 = await datosGtm.resources.report_pdf 
//         await pool.query(
//             `
//             insert into datos(
//                 title
//             )
//             values(
//                 '${datosGtm.resources.report_pdf}'
//             )
//             `
//         );
        
//         return res.json(datosGtm);

//     }

//     public async list(req: Request, res: Response): Promise<any>{
//         const registros = await pool.query(
//             `
//             insert into datos(
//                 title
//             )
//             values(
//                 'prueba4'
//             )
//             `
//         );
//         res.json(registros);
//     }

// }




// const gtmController = new GtmController;
// export default gtmController;