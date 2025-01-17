import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import {AppointmentValidationService} from "./appointment-validation.service";
import {PrismaService} from "../prisma.service";
import {PatientModule} from "../patient/patient.module";

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentValidationService, PrismaService],
})
export class AppointmentModule {}