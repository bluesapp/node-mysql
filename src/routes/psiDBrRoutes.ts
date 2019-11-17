import express, { Router } from 'express';

import psiDBController from '../controllers/psiDBControllers';

class PsiRouters {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/list', psiDBController.list);
        this.router.get('/getdesktop/:fromDate,:toDate', psiDBController.getDesktopFilter);
        this.router.get('/getmobile/:fromDate,:toDate', psiDBController.getMobileFilter);
        this.router.get('/getdevices/:fromDate,:toDate', psiDBController.getDevicesFilter);
        this.router.get('/getdesktop', psiDBController.getDesktopLimit);
        this.router.get('/getmobile', psiDBController.getMobileLimit);
        this.router.get('/getdevices', psiDBController.getDevicesLimit);
    }
}

export default new PsiRouters().router;
