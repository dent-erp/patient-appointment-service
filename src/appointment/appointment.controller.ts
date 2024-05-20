import {Body, Controller, Delete, Get, Param, Put} from '@nestjs/common';
import {Appointment, Prisma} from "@prisma/client";
import {AppointmentService} from "./appointment.service";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {AppointmentCreateDto} from "./dto/appointment-create-dto.model";

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {
    }

    @Get()
    findAll(): Promise<Appointment[]> {
        return this.appointmentService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<Appointment> {
        return this.appointmentService.findById(id)
    }

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

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Appointment> {
        return this.appointmentService.delete(id);
    }
}
