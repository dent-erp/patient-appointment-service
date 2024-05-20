import {Module} from '@nestjs/common';
import {PatientAppointmentController} from './patient-appointment.controller';
import {PatientAppointmentService} from './patient-appointment.service';
import {PrismaService} from "../prisma.service";
import {PatientService} from "../patient/patient.service";
import {PatientValidationService} from "../patient/patient-validation.service";
import {AppointmentValidationService} from "../appointment/appointment-validation.service";

@Module({
    controllers: [PatientAppointmentController],
    providers: [PatientAppointmentService, PrismaService, PatientService, PatientValidationService, AppointmentValidationService]
})
export class PatientAppointmentModule {
}
