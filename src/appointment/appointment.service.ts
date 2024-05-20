import {HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {AppointmentValidationService} from "./appointment-validation.service";
import {Appointment, Prisma} from "@prisma/client";

@Injectable()
export class AppointmentService {
    constructor(
        private prismaService: PrismaService,
        private appointmentValidationService: AppointmentValidationService
    ) {
    }

    public async findAll(): Promise<Appointment[]> {
        return this.prismaService.appointment.findMany();
    }

    public async findById(id: number): Promise<Appointment> {
        const existingAppointment = await this.prismaService.appointment.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!existingAppointment) {
            throw new HttpException(`Appointment with id ${id} not found`, 404);
        }

        return existingAppointment;
    }

    public async update(id: number, appointment: Prisma.AppointmentUpdateInput): Promise<Appointment> {
        await this.findById(id);
        await this.appointmentValidationService.validateUpdateAppointment(appointment);
        return this.prismaService.appointment.update({
            where: {
                id: Number(id)
            },
            data: appointment
        });
    }

    public async delete(id: number): Promise<Appointment> {
        await this.findById(id);

        return this.prismaService.appointment.delete({
            where: {
                id: Number(id)
            }
        });
    }
}
