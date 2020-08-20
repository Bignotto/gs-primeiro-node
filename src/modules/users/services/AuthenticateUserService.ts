import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/Users';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthemticateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new AppError('Wrong email and password combination!', 401);

        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched)
            throw new AppError('Wrong email and password combination!', 401);

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user: user,
            token,
        };
    }
}

export default AuthemticateUserService;
