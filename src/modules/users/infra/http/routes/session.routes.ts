import { Router, Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionRoute = Router();

sessionRoute.post('/', async (request: Request, response: Response) => {
    const usersRepository = new UsersRepository();
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionRoute;
