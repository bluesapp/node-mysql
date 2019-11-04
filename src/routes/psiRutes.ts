import express, { Router } from 'express';

import psiControllers from '../controllers/psiControllers';

class PsiRouters {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/desktop', psiControllers.getApiGoogleDesktop);
        this.router.get('/mobile', psiControllers.getApiGoogleMobile);
    }
}

export default new PsiRouters().router;
