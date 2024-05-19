import { HttpException, Injectable, Logger} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Patient, Prisma} from "@prisma/client";

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService) {
    }


    public async create(patient: Prisma.PatientCreateInput): Promise<Patient> {
        return this.prisma.patient.create({
            data: patient
        });
    }

    public async findAll(): Promise<Patient[]> {
        return this.prisma.patient.findMany();
    }

    public async findById(id: number): Promise<Patient> {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (patient == null) {
            Logger.warn(`Patient with id ${id} not found!`);
            throw new HttpException(`Patient with id ${id} found!`, 404);
        }

        return patient;
    }

    public async update(id: number, patient: Prisma.PatientUpdateInput): Promise<Patient> {
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

    public async delete(id: number) {
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
}
