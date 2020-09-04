import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import ListProvidersService from './ListProvidersService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'; //' /repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'; //'../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('ListProviders', () => {
    let fakeUsersRepository: FakeUsersRepository;
    let fakeHashProvider: FakeHashProvider;
    let listProvidersService: ListProvidersService;

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list all providers', async () => {
        const doe = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const tre = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'john@doe.com',
            password: '123456',
        });

        const qua = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'john@doe.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qui',
            email: 'john@doe.com',
            password: '123456',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([doe, tre, qua]);
    });
});
