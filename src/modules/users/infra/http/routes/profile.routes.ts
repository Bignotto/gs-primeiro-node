import { Router } from 'express';
import { container } from 'tsyringe';
import ProfileController from '../controllers/ProfileController';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticaded);

profileRouter.post('/', profileController.update);

export default profileRouter;
