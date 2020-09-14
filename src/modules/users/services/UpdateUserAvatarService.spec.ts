import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('UpdateUserAvatar', () => {
    let fakeUsersRepository: FakeUsersRepository;
    let fakeHashProvider: FakeHashProvider;
    let fakeStorageProvider: FakeStorageProvider;
    let fakeCacheProvider: FakeCacheProvider;

    let createUser: CreateUserService;

    let updateUserAvatar: UpdateUserAvatarService;

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeStorageProvider = new FakeStorageProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );

        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should update avatar', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not update non existing users avatar', async () => {
        expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user-id',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating user avatar', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'outro.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

        expect(user.avatar).toBe('outro.jpg');
    });
});
