import { Router } from 'express';

import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const propviderAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticade);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.post('/me', propviderAppointmentsController.index);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

export default appointmentsRouter;
