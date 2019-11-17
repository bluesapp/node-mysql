import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
// import registrosRoutes from './routes/registrosRoutes';
// import gtmRoutes from './routes/gtmRoutes'
import psiRutes from './routes/psiRutes';
import psiDBRutes from './routes/psiDBrRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 1337);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/psi', psiRutes)
        this.app.use('/api/psidb', psiDBRutes)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on porte', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();