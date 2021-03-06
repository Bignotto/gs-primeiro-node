import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        user_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        const hour = getHours(appointmentDate);

        if (hour > 17 || hour < 8) {
            throw new AppError(
                'Cant create appointment before 8h or after 17h',
            );
        }

        if (user_id === provider_id) {
            throw new AppError('Cant create appointment with yourself!');
        }

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError('Cant create an appointment in the past.');
        }

        const findAppointmentOnSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,
        );

        if (findAppointmentOnSameDate) {
            throw new AppError('Unavailable hour 🤔');
        }
        const appointment = this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id,
        });

        const formatedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para ${formatedDate}`,
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(
                appointmentDate,
                'yyyy-M-d',
            )}`,
        );

        return appointment;
    }
}

export default CreateAppointmentService;
