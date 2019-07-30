import express, { Router } from 'express';

import registrosController from '../controllers/registrosController';

class RegistrosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', registrosController.list);
        this.router.get('/:id', registrosController.getOne);
        this.router.post('/', registrosController.create);
        this.router.put('/:id', registrosController.update);
        this.router.delete('/:id', registrosController.delete);
    }

}

export default new RegistrosRoutes().router;