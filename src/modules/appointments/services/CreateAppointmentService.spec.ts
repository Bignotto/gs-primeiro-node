import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('CreateAppointment', () => {
    let fakeAppointmentRepository: FakeAppointmentRepository;
    let createAppointment: CreateAppointmentService;
    let fakeNotificationRepository: FakeNotificationsRepository;
    let fakeCacheProvider: FakeCacheProvider;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create an appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 20, 11).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 9, 20, 13),
            user_id: 'user1',
            provider_id: '101918171615141312',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('101918171615141312');
    });

    it('should not create two appointments on same date and time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 20, 11).getTime();
        });
        const appointmentDate = new Date(2020, 9, 20, 15);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'user1',
            provider_id: '101918171615141312',
        });

        await expect(
            createAppointment.execute({
                user_id: 'user1',
                date: appointmentDate,
                provider_id: '101918171615141312',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment in the past', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 20, 11).getTime();
        });

        await expect(
            createAppointment.execute({
                user_id: 'user1',
                date: new Date(2020, 9, 20, 10),
                provider_id: '101918171615141312',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 20, 11).getTime();
        });

        await expect(
            createAppointment.execute({
                user_id: 'user1',
                date: new Date(2020, 9, 20, 10),
                provider_id: 'user1',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8 or after 17', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 2, 11).getTime();
        });

        await expect(
            createAppointment.execute({
                user_id: 'user1',
                date: new Date(2020, 9, 20, 7),
                provider_id: 'provider',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                user_id: 'user1',
                date: new Date(2020, 9, 20, 18),
                provider_id: 'provider',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
