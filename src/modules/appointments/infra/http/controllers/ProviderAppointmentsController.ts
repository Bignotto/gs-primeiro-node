import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.query;
        const provider_id = request.user.id;

        const listProviderAppointmentService = container.resolve(
            ListProviderAppointmentsService,
        );
        const appointments = await listProviderAppointmentService.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return response.json(appointments);
    }
}
