import { UpdateDateColumn, getRepository } from 'typeorm';
import User from '../models/Users';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<void> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);
        if (!user) {
            throw new Error('Only authenticated user can change avatar...');
        }

        if (user.avatar) {
        }
    }
}

export default UpdateUserAvatarService;
