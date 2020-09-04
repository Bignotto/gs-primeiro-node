import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthsAvailabilityService';

export default class ProviderMonthAbailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year } = request.body;
        const provider_id = request.params.id;

        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService,
        );
        const availability = await listProviderMonthAvailabilityService.execute(
            {
                month,
                year,
                provider_id,
            },
        );

        return response.json(availability);
    }
}
