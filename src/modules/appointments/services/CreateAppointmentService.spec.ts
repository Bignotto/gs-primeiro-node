import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('should be able to create an appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '101918171615141312',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('101918171615141312');
    });

    it('should not create two appointments on same date and time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        const appointment = await createAppointment.execute({
            date: appointmentDate,
            provider_id: '101918171615141312',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '101918171615141312',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
