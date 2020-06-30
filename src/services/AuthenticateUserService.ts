import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/Users';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}

class AuthemticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {email}
        });

        if(!user) throw new Error("Wrong email and password combination!");

        const passwordMatched = await compare(password,user.password)
        if(!passwordMatched) throw new Error("Wrong email and password combination!");

        return {
            user: user
        }
    }
}

export default AuthemticateUserService;
