import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    abailable: boolean;
}>;

@injectable()
class ListProviderMonthsAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        const appointments = this.appointmentsRepository.findAllInMonthFromProvider(
            { provider_id, year, month },
        );

        console.log(appointments);

        return [{ day: 1, abailable: false }];
    }
}

export default ListProviderMonthsAvailabilityService;
