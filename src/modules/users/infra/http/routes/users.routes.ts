import { Router, Request, Response, request, response } from 'express';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoute = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoute.post('/', usersController.create);

usersRoute.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRoute;
