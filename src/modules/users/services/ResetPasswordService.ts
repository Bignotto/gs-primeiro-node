import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

import User from '@modules/users/infra/typeorm/entities/Users';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token does not exist');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exit');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
