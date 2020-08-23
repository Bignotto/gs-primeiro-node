import 'reflect-metadata';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('Authenticate', () => {
    it('should be able to authenticate user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const response = await authUser.execute({
            email: 'john@doe.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with no existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        expect(
            authUser.execute({
                email: 'john@doe.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        expect(
            authUser.execute({
                email: 'john@doe.com',
                password: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
