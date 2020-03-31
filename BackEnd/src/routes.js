import { Router } from 'express';

import AdministradorController from './app/controllers/AdministradorController';
import StudantController from './app/controllers/StudantController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';


const routes = new Router();

routes.post('/administrador', AdministradorController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/studants', StudantController.store);




export default routes;