import { Router } from 'express';

import AdministradorController from './app/controllers/AdministradorController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';


const routes = new Router();

routes.post('/administrador', AdministradorController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentController.store);

routes.post('/plans', PlanController.store);





export default routes;