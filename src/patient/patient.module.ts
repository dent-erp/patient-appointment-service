import {Module} from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import {PrismaService} from "../prisma.service";
import {PatientValidationService} from "./patient-validation.service";
import {AppointmentModule} from "../appointment/appointment.module";
import {AppointmentValidationService} from "../appointment/appointment-validation.service";

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService, PatientValidationService, AppointmentValidationService],
  imports: [AppointmentModule]
})
export class PatientModule {}
