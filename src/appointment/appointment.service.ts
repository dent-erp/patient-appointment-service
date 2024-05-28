import {HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {AppointmentValidationService} from "./appointment-validation.service";
import {Appointment} from "@prisma/client";
import {AppointmentRequestDto} from "./dto/appointment-request-dto.model";

@Injectable()
export class AppointmentService {
    constructor(
        private prismaService: PrismaService,
        private appointmentValidationService: AppointmentValidationService
    ) {
    }

    public async findAll(): Promise<Appointment[]> {
        return this.prismaService.appointment.findMany(
            {
                include: {
                    patient: true
                }
            }
        );
    }

    public async findById(id: number): Promise<Appointment> {
        const existingAppointment = await this.prismaService.appointment.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                patient: true
            }
        });

        if (!existingAppointment) {
            throw new HttpException(`Appointment with id ${id} not found`, 404);
        }

        return existingAppointment;
    }

    public async update(id: number, appointment: AppointmentRequestDto): Promise<Appointment> {
        await this.findById(id);

        const patient = await this.prismaService.patient.findUnique({
            where: {id: appointment.patient_id},
        });

        if (!patient) {
            throw new HttpException(`Patient with id ${appointment.patient_id} not found`, 404);
        }

        await this.appointmentValidationService.validateUpdateAppointment(appointment);
        return this.prismaService.appointment.update({
            where: {
                id: Number(id)
            },
            data: {
                start_date: appointment.start_date,
                end_date: appointment.end_date,
                type: appointment.type,
                patient: {
                    connect: {
                        id: appointment.patient_id
                    }
                }
            }
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

    public async create(appointment: AppointmentRequestDto): Promise<Appointment> {

        const patient = await this.prismaService.patient.findUnique({
            where: {id: appointment.patient_id},
        });

        if (!patient) {
            throw new HttpException(`Patient with id ${appointment.patient_id} not found`, 404);
        }

        return this.prismaService.appointment.create({
            data: {
                start_date: appointment.start_date,
                end_date: appointment.end_date,
                type: appointment.type,
                patient: {
                    connect: {
                        id: appointment.patient_id
                    }
                }
            },
        });
    }
}
