import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Appointment, Prisma} from "@prisma/client";
import {PatientAppointmentCreateDto} from "./dto/patient-appointment-create-dto.model";
import {PatientAppointmentService} from "./patient-appointment.service";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('patient-appointment')
@UseGuards(AuthGuard)
@Controller('patient-appointment')
export class PatientAppointmentController {
    constructor(private patientAppointmentService: PatientAppointmentService) {
    }

    @ApiBody({
        description: 'Patient and appointment creation data',
        type: PatientAppointmentCreateDto
    })
    @ApiOperation({ summary: 'Use for booking an appointment with a new patient' })
    @Post()
    bookAppointmentWithNewPatient(
        @Body() patientAppoitnmentData:
            {
                patient: Prisma.PatientCreateInput,
                appointment: Prisma.AppointmentCreateInput
            }
    ): Promise<Appointment> {
        return this.patientAppointmentService.bookAppointmentWithNewPatient(patientAppoitnmentData);
    }
}
