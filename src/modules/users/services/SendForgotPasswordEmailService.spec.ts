import 'reflect-metadata';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmailService', () => {
    it('should send instructions email to user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
        );

        const user = await sendForgotPasswordEmail.execute({
            email: 'john@doe.com',
        });

        expect(user).toHaveProperty('id');
    });
});
