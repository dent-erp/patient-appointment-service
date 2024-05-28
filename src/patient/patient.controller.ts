import {Body, Controller, Delete, Get, Param, Post, Put, Logger, UseGuards} from '@nestjs/common';
import {PatientService} from "./patient.service";
import {Patient, Prisma} from "@prisma/client";
import {ApiBody, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {PatientCreateDto} from "./dto/patient-create-dto.model";
import {AppointmentRequestDto} from "../appointment/dto/appointment-request-dto.model";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('patients')
@UseGuards(AuthGuard)
@Controller('patients')
export class PatientController {
    constructor(private patientService: PatientService) {
    }

    @ApiOperation({ summary: 'Use for finding all patients' })
    @Get()
    findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

    @ApiOperation({ summary: 'Use for finding a patient by ID' })
    @Get(':id')
    findById(@Param('id') id: number): Promise<Patient> {
        return this.patientService.findById(id);
    }

    @ApiOperation({ summary: 'Use for creating a new patient' })
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

    @ApiOperation({ summary: 'Use for updating an existing patient' })
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

    @ApiOperation({ summary: 'Use for deleting an existing patient' })
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.patientService.delete(id);
    }

    @ApiOperation({ summary: 'Use for booking an appointment with an existing patient' })
    @ApiBody({
        description: 'Appointment creation data',
        type: AppointmentRequestDto
    })
    @Post(':id/book-appointment')
    bookAppointment(
        @Param('id') id: number,
        @Body() appointment: Prisma.AppointmentCreateInput
    ) {
        return this.patientService.bookAppointment(id, appointment);
    }
}
