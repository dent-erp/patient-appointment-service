import {Body, Controller, Delete, Get, Param, Put, UseGuards} from '@nestjs/common';
import {Appointment, Prisma} from "@prisma/client";
import {AppointmentService} from "./appointment.service";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AppointmentCreateDto} from "./dto/appointment-create-dto.model";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('appointments')
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {
    }

    @ApiOperation({ summary: 'Use for finding all appointments' })
    @Get()
    findAll(): Promise<Appointment[]> {
        return this.appointmentService.findAll();
    }

    @ApiOperation({ summary: 'Use for finding an appointment by ID' })
    @Get(':id')
    findById(@Param('id') id: number): Promise<Appointment> {
        return this.appointmentService.findById(id)
    }

    @ApiOperation({ summary: 'Use for creating a new appointment' })
    @ApiBody({
        description: 'Appointment update data',
        type: AppointmentCreateDto
    })
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() appointment: Prisma.AppointmentUpdateInput
    ): Promise<Appointment> {
        return this.appointmentService.update(id, appointment);
    }

    @ApiOperation({ summary: 'Use for deleting an existing appointment' })
    @Delete(':id')
    delete(@Param('id') id: number): Promise<Appointment> {
        return this.appointmentService.delete(id);
    }
}
