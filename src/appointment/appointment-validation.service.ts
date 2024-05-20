import {HttpException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class AppointmentValidationService {
    constructor(private prisma: PrismaService) {
    }

    public async validateCreateAppointment(appointment: Prisma.AppointmentCreateInput): Promise<void> {
        this.checkStartTimeBeforeEndTime(
            new Date(appointment.start_date),
            new Date(appointment.end_date)
        );
    }

    private checkStartTimeBeforeEndTime(startTime: Date, endTime: Date): void {
        if (startTime >= endTime) {
            throw new HttpException('Start time must be before end time', 404);
        }
    }
}