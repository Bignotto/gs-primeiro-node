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
            user_id: 'user x',
            date: new Date(2020, 9, 10, 9, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            user_id: 'user x',
            date: new Date(2020, 9, 10, 13, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            user_id: 'user x',
            date: new Date(2020, 9, 10, 17, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 10, 14, 0, 0).getTime();
        });

        const availability = await listProvidersDayAvailabilityService.execute({
            provider_id: 'provider 1',
            year: 2020,
            month: 10,
            day: 10,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: false },
                { hour: 13, available: false },
                { hour: 14, available: false },
                { hour: 15, available: true },
                { hour: 16, available: true },
                { hour: 17, available: false },
            ]),
        );
    });
});
