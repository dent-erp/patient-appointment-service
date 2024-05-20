import { Injectable } from '@nestjs/common';
import {PatientService} from "../patient/patient.service";
import {PatientAppointmentModule} from "./patient-appointment.module";
import {Appointment, Prisma} from "@prisma/client";

@Injectable()
export class PatientAppointmentService {
    constructor(private patientService: PatientService) {
    }

    public async bookAppointmentWithNewPatient(patientAppointmentData: {
        patient: Prisma.PatientCreateInput,
        appointment: Prisma.AppointmentCreateInput
    }): Promise<Appointment> {
        const patient = await this.patientService.create(patientAppointmentData.patient);
        const appointment = await this.patientService.bookAppointment(patient.id, patientAppointmentData.appointment);

        return appointment;
    }

}
