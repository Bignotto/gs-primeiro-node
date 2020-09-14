import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('CreateUser', () => {
    let fakeUsersRepository: FakeUsersRepository;
    let fakeHashProvider: FakeHashProvider;
    let createUser: CreateUserService;
    let fakeCacheProvider: FakeCacheProvider;

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not create user with same email', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'john@doe.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
