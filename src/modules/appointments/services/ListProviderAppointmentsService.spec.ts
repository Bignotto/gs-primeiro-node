import 'reflect-metadata';

// import AuthenticateUserService from './AuthenticateUserService';
import ListProviderAppointmentsService from '././ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviderAppointments', () => {
    let listProviderAppointmentsService: ListProviderAppointmentsService;
    let fakeAppointmentRepository: FakeAppointmentsRepository;
    let fakeCacheProvider: FakeCacheProvider;

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentRepository,
            fakeCacheProvider,
        );
    });

    it('should list appointments on a given date', async () => {
        const appointment1 = await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            user_id: 'user x',
            date: new Date(2020, 9, 10, 9, 0, 0),
        });
        const appointment2 = await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            user_id: 'user x',
            date: new Date(2020, 9, 10, 13, 0, 0),
        });
        const appointment3 = await fakeAppointmentRepository.create({
            provider_id: 'provider 1',
            user_id: 'user x',
            date: new Date(2020, 9, 10, 17, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider 1',
            year: 2020,
            month: 10,
            day: 10,
        });

        expect(appointments).toEqual([
            appointment1,
            appointment2,
            appointment3,
        ]);
    });
});
