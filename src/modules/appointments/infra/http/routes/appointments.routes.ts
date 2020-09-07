import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const propviderAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticade);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);
appointmentsRouter.post('/me', propviderAppointmentsController.index);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

export default appointmentsRouter;
