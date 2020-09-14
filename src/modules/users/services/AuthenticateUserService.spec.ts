import 'reflect-metadata';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('Authenticate', () => {
    let fakeUsersRepository: FakeUsersRepository;
    let fakeHashProvider: FakeHashProvider;
    let fakeCacheProvider: FakeCacheProvider;
    let createUser: CreateUserService;
    let authUser: AuthenticateUserService;

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );

        authUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to authenticate user', async () => {
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
        await expect(
            authUser.execute({
                email: 'john@doe.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not authenticate with wrong password', async () => {
        createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await expect(
            authUser.execute({
                email: 'john@doe.com',
                password: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
