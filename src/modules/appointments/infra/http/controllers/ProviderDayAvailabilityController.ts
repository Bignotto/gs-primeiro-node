import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAbailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.query;
        const provider_id = request.params.id;

        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );
        const availability = await listProviderDayAvailabilityService.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return response.json(availability);
    }
}
