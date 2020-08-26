import 'reflect-metadata';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
    it('should send instructions email to user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await fakeUsersRepository.create({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'john@doe.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not recover password of non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'john@doe.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
