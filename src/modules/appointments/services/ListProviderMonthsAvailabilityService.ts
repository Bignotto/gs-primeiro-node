import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    abailable: boolean;
}>;

@injectable()
class ListProviderMonthsAvailabilityService {
    constructor() {}

    public async execute({
        user_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        return [{ day: 1, abailable: false }];
    }
}

export default ListProviderMonthsAvailabilityService;
