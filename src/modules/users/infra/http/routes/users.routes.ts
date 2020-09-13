import { Router, Request, Response, request, response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoute = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoute.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRoute.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRoute;
