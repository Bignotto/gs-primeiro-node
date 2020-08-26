import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswrodEmailService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {}
}

export default SendForgotPasswrodEmailService;
