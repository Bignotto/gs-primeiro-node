import Appointment from '../models/Appointments';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });
        this.appointments.push(appointment);
        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentOnSameDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointmentOnSameDate || null;
    }

    public all(): Appointment[] {
        return this.appointments;
    }
}

export default AppointmentRepository;
