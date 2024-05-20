import { HttpException, Injectable, Logger} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Appointment, Patient, Prisma} from "@prisma/client";
import {PatientValidationService} from "./patient-validation.service";
import {AppointmentValidationService} from "../appointment/appointment-validation.service";

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService, private patientValidationService: PatientValidationService, private appointmentValidationService: AppointmentValidationService) {
    }


    public async create(patient: Prisma.PatientCreateInput): Promise<Patient> {
        await this.patientValidationService.validateCreatePatient(patient);
        return this.prisma.patient.create({
            data: patient
        });
    }

    public async findAll(): Promise<Patient[]> {
        return this.prisma.patient.findMany({
            include: {
                appointments: true
            }
        });
    }

    public async findById(id: number): Promise<Patient> {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                appointments: true
            }
        });

        if (patient == null) {
            Logger.warn(`Patient with id ${id} not found!`);
            throw new HttpException(`Patient with id ${id} found!`, 404);
        }

        return patient;
    }

    public async update(id: number, patient: Prisma.PatientUpdateInput): Promise<Patient> {
        // TODO: Uncomment when corrected
        // await this.patientValidationService.validateUpdatePatient(patient);
        const existingPatient = await this.prisma.patient.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!existingPatient) {
            throw new HttpException(`Patient with id ${id} not found!`, 404);
        }

        return this.prisma.patient.update({
            where: {
                id: Number(id)
            },
            data: patient
        });
    }

    public async delete(id: number): Promise<Patient> {
        const existingPatient = await this.prisma.patient.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!existingPatient) {
            throw new HttpException(`Patient with id ${id} not found!`, 404);
        }

        return this.prisma.patient.delete({
            where: {
                id: Number(id)
            }
        });
    }

    public async bookAppointment(id: number, appointment: Prisma.AppointmentCreateInput): Promise<Appointment> {

        const patient = await this.prisma.patient.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!patient) {
            throw new HttpException(`Patient with id ${id} not found!`, 404);
        }

        return this.prisma.appointment.create({
            data: {
                ...appointment,
                patient: {
                    connect: {
                        id: patient.id
                    }
                }
            }
        });
    }
}
