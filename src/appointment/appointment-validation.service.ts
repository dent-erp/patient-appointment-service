import {HttpException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";
import {AppointmentRequestDto} from "./dto/appointment-request-dto.model";

@Injectable()
export class AppointmentValidationService {
    constructor(private prisma: PrismaService) {
    }

    public async validateCreateAppointment(appointment: AppointmentRequestDto): Promise<void> {
        this.checkStartTimeBeforeEndTime(
            new Date(appointment.start_date),
            new Date(appointment.end_date)
        );
    }

    public async validateUpdateAppointment(appointment: AppointmentRequestDto): Promise<void> {
       //TODO: implement
    }

    private checkStartTimeBeforeEndTime(startTime: Date, endTime: Date): void {
        if (startTime >= endTime) {
            throw new HttpException('Start time must be before end time', 404);
        }
    }
}