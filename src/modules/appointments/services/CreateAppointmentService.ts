import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    // private appointmentsRepository: AppointmentsRepository;

    // constructor(appointmentsRepository: AppointmentsRepository) {
    //     this.appointmentsRepository = appointmentsRepository;
    // }

    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentOnSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentOnSameDate) {
            throw new AppError('Unavailable hour 🤔');
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
