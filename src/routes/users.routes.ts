import { Router, Request, Response, request, response } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticade from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRoute = Router();
const upload = multer(uploadConfig);

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

usersRoute.patch(
    '/avatar',
    ensureAuthenticade,
    upload.single('avatar'),
    async (request, response) => {
        return response.json({ message: 'yeah' });
    },
);

export default usersRoute;
