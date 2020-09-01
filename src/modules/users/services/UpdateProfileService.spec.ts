import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import UpdateProfileService from './UpdateProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('UpdateUserProfile', () => {
    let fakeUsersRepository: FakeUsersRepository;
    let fakeHashProvider: FakeHashProvider;
    let updateProfileService: UpdateProfileService;

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able update user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Homer Simpson',
            email: 'homer@gmail.com',
        });

        expect(updatedUser.email).toBe('homer@gmail.com');
        expect(updatedUser.name).toBe('Homer Simpson');
    });

    it('should not be able to change email with one already in use', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Homer Simpson',
            email: 'homer@doe.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Homer Simpson',
                email: 'john@doe.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update non existing user', async () => {
        await expect(
            updateProfileService.execute({
                user_id: 'non existing user',
                name: 'Homer Simpson',
                email: 'john@doe.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able update his password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Homer Simpson',
            email: 'homer@gmail.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update password without provide actual correct password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Homer Simpson',
                email: 'homer@gmail.com',
                old_password: 'wrong password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update password without provide actual password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Homer Simpson',
                email: 'homer@gmail.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
