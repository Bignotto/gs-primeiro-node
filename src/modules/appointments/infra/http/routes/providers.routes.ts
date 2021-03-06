import { Router, Request, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticade);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providerMonthAvailabilityController.index,
);
providersRouter.get(
    '/:id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providerDayAvailabilityController.index,
);

// providersRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

export default providersRouter;
