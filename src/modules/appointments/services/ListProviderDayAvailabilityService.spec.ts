import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import ListProvidersDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

import AppError from '@shared/errors/AppError';

describe('ListDayAvailabilityService', () => {
    let listProvidersDayAvailabilityService: ListProvidersDayAvailabilityService;
    let fakeAppointmentRepository: FakeAppointmentsRepository;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        listProvidersDayAvailabilityService = new ListProvidersDayAvailabilityService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to list all providers', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 10, 9, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 10, 13, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 10, 17, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 11, 10, 0, 0),
        });

        const availability = await listProvidersDayAvailabilityService.execute({
            provider_id: 'provider 1',
            year: 2020,
            month: 10,
            day: 10,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: true },
                { hour: 9, available: false },
                { hour: 10, available: true },
                { hour: 11, available: true },
                { hour: 12, available: true },
                { hour: 13, available: false },
                { hour: 14, available: true },
                { hour: 15, available: true },
                { hour: 16, available: true },
                { hour: 17, available: false },
            ]),
        );
    });
});
