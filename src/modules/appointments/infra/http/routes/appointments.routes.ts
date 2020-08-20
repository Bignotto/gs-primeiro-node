import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticade);

appointmentsRouter.post('/', async (request: Request, response: Response) => {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id: provider,
    });

    return response.json(appointment);
});

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();
//     return response.json(appointments);
// });

export default appointmentsRouter;
