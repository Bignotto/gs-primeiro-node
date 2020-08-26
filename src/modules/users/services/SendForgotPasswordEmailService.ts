import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswrodEmailService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (!checkUserExists) throw new AppError('User does not exists.');

        this.mailProvider.sendMail(email, 'Password reset!');
    }
}

export default SendForgotPasswrodEmailService;
