import { Router, Request, Response, request, response } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post('/', async (request: Request, response: Response) => {
    const usersRepository = new UsersRepository();
    const { name, email, password } = request.body;
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return response.json(user);
});

usersRoute.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    async (request, response) => {
        const usersRepository = new UsersRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(
            usersRepository,
        );
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json(user);
    },
);

export default usersRoute;
