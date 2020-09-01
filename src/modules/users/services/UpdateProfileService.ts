import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        if (!user) throw new AppError('Invalid user to update profile!');

        const emailExists = await this.usersRepository.findByEmail(email);
        if (emailExists && emailExists.id !== user_id)
            throw new AppError('E-Mail address already in use.');

        if (password && !old_password) {
            throw new AppError('Actual password confirmation needed.');
        }

        if (password && old_password) {
            const validatePassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );
            if (!validatePassword) throw new AppError('Wrong password.');

            user.password = await this.hashProvider.generateHash(password);
        }
        //const hashPassword = await this.hashProvider.generateHash(password);
        user.name = name;
        user.email = email;
        await this.usersRepository.save(user);
        return user;
    }
}

export default UpdateProfileService;
