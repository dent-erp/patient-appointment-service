import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientAppointmentModule } from './patient-appointment/patient-appointment.module';

@Module({
  imports: [PatientModule, AppointmentModule, PatientAppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
