import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import ListProvidersMonthAvailabilityService from './ListProviderMonthsAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

import AppError from '@shared/errors/AppError';

describe('ListMonthAvailabilityService', () => {
    let listProvidersMonthAvailabilityService: ListProvidersMonthAvailabilityService;
    let fakeAppointmentRepository: FakeAppointmentsRepository;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        listProvidersMonthAvailabilityService = new ListProvidersMonthAvailabilityService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to list all providers', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 10, 10, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 10, 11, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            date: new Date(2020, 9, 11, 10, 0, 0),
        });

        const availability = await listProvidersMonthAvailabilityService.execute(
            {
                provider_id: 'provider 1',
                year: 2020,
                month: 10,
            },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 9, available: true },
                { day: 10, available: false },
                { day: 11, available: false },
                { day: 12, available: true },
            ]),
        );
    });
});
