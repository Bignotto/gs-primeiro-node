import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

describe('CreateAppointment', () => {
    let fakeAppointmentRepository: FakeAppointmentRepository;
    let createAppointment: CreateAppointmentService;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to create an appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: 'user1',
            provider_id: '101918171615141312',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('101918171615141312');
    });

    it('should not create two appointments on same date and time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        const appointment = await createAppointment.execute({
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
});
