import { Router, Request, Response, request, response } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post('/', async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return response.json(user);
});

usersRoute.patch(
    '/avatar',
    ensureAuthenticade,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatarService = new UpdateUserAvatarService();
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json(user);
    },
);

export default usersRoute;
