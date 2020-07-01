import { Router, Request, Response, request, response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticade from '../middlewares/ensureAuthenticated';

const usersRoute = Router();

usersRoute.post('/', async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });
        delete user.password;
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRoute.patch('/avatar', ensureAuthenticade, async (request, response) => {
    return response.json({ message: 'yeah' });
});

export default usersRoute;
