import { Router, request, response } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentRepository from '../repositories/AppoiintmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentOnSameDate = appointmentRepository.findByDate(
        parsedDate,
    );

    if (findAppointmentOnSameDate) {
        return response.status(400).json({ message: 'Unavailable hour 🤔' });
    }
    const appointment = appointmentRepository.create(provider, parsedDate);
    return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all();
    return response.json(appointments);
});

export default appointmentsRouter;
