import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';
import authConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthemticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) throw new Error('Wrong email and password combination!');

        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched)
            throw new Error('Wrong email and password combination!');

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.secret,
        });

        return {
            user: user,
            token,
        };
    }
}

export default AuthemticateUserService;
