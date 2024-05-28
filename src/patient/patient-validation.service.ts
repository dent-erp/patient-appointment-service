import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class PatientValidationService {
    constructor(private prisma: PrismaService) {
    }

    public async validateCreatePatient(patient: Prisma.PatientCreateInput): Promise<void> {
        await this.checkEmailFormat(patient.email);
        await this.checkEmailUnique(patient.email);
        await this.checkPhoneNumberFormat(patient.phone_number);
        await this.checkPhoneNumberUnique(patient.phone_number);
    }

    public async validateUpdatePatient(patient: Prisma.PatientUpdateInput): Promise<void> {
        // TODO: Correct this so that it doesnt fail for the entity itself
        if (patient.email.toString()) {
            await this.checkEmailFormat(patient.email.toString());
            await this.checkEmailUnique(patient.email.toString());
        }
        if (patient.phone_number.toString()) {
            await this.checkPhoneNumberFormat(patient.toString());
            await this.checkPhoneNumberUnique(patient.toString());
        }
    }

    private async checkEmailFormat(email: string): Promise<void> {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            throw new HttpException('Invalid email format!', 400);
        }
    }

    private async checkEmailUnique(email: string): Promise<void> {
        const existingPatient = await this.prisma.patient.findUnique({
            where: { email: email },
        });
        if (existingPatient) {
            throw new HttpException('Email already in use!', 400);
        }
    }

    private async checkPhoneNumberFormat(phoneNumber: string): Promise<void> {
        if (!phoneNumber) {
            return;
        }
        const phoneRegex =  /^0\d{2} ?\d{3} ?\d{3}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new HttpException('Invalid phone number format!', 400);
        }
    }

    private async checkPhoneNumberUnique(phoneNumber: string): Promise<void> {
        if (!phoneNumber) {
            return;
        }
        const existingPatient = await this.prisma.patient.findUnique({
            where: { phone_number: phoneNumber },
        });
        if (existingPatient) {
            throw new HttpException('Phone number already in use!', 400);
        }
    }
}