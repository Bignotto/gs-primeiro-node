import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import { isEqual } from 'date-fns';
import { getMongoRepository, MongoRepository, Raw } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async findByDate(date: Date): Promise<Notification | undefined> {
        const findNotification = await this.ormRepository.findOne({
            where: { date },
        });

        return findNotification;
    }

    public async create({
        recipient_id,
        content,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });
        return notification;
    }
}

export default NotificationsRepository;
