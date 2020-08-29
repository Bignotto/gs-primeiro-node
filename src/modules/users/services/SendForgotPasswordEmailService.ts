import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUserTokenRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError('User does not exists.');

        const { token } = await this.userTokenRepository.generate(user.id);

        await this.mailProvider.sendMail(
            email,
            `Password reset token: ${token}`,
        );
    }
}

export default SendForgotPasswordEmailService;
