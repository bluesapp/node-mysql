import express, { Router } from 'express';

import gtmController from "../controllers/gtmControllers";

class GtmRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', gtmController.getApiGTMetrix);
        this.router.get('/lista', gtmController.list);
   
    }

}

export default new GtmRoutes().router;
