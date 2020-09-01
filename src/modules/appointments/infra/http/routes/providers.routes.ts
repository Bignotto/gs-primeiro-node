import { Router, Request, Response } from 'express';

import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticade);

providersRouter.get('/', providersController.index);

// providersRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

export default providersRouter;
