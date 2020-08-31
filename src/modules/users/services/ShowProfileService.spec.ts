import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import ShowProfileService from './ShowProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

describe('UpdateUserProfile', () => {
    let fakeUsersRepository: FakeUsersRepository;
    let showProfileService: ShowProfileService;

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfileService = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able show user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.email).toBe('john@doe.com');
        expect(profile.name).toBe('John Doe');
    });

    it('should not be able to show invalid user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'non existing user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
