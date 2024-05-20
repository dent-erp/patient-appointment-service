import {Body, Controller, Delete, Get, Param, Post, Put, Logger} from '@nestjs/common';
import {PatientService} from "./patient.service";
import {Patient, Prisma} from "@prisma/client";
import {ApiBody, ApiQuery, ApiTags} from "@nestjs/swagger";
import {PatientCreateDto} from "./dto/patient-create-dto.model";
import {AppointmentCreateDto} from "../appointment/dto/appointment-create-dto.model";

@ApiTags('patients')
@Controller('patients')
export class PatientController {
    constructor(private patientService: PatientService) {
    }

    @Get()
    findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<Patient> {
        return this.patientService.findById(id);
    }

    @ApiBody({
        description: 'Patient creation data',
        type: PatientCreateDto
    })
    @Post()
    create(
        @Body() patient: Prisma.PatientCreateInput
    ): Promise<Patient> {
        return this.patientService.create(patient);
    }

    @ApiBody({
        description: 'Patient update data',
        type: PatientCreateDto
    })
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() patient: Prisma.PatientUpdateInput
    ): Promise<Patient> {
        return this.patientService.update(id, patient);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.patientService.delete(id);
    }

    @ApiBody({
        description: 'Appointment creation data',
        type: AppointmentCreateDto
    })
    @Post(':id/book-appointment')
    bookAppointment(
        @Param('id') id: number,
        @Body() appointment: Prisma.AppointmentCreateInput
    ) {
        return this.patientService.bookAppointment(id, appointment);
    }
}
