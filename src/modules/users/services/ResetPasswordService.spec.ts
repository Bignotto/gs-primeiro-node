//teste
import 'reflect-metadata';

import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
        );
    });

    it('should reset users password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        await resetPasswordService.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123123');
    });
});
