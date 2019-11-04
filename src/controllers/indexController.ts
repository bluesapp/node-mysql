import { Request, Response } from 'express';

//Controlador de la ruta principal

class IndexController {

    public index(req: Request, res: Response) {
        res.json({text: 'API is in /api/gtm'});
    }

}

export const indexController = new IndexController;