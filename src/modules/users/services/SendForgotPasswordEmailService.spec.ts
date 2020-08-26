import 'reflect-metadata';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );
    });

    it('should send instructions email to user', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'john@doe.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgoten password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'john@doe.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
