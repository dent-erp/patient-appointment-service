import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientAppointmentModule } from './patient-appointment/patient-appointment.module';
import { AuthModule } from './auth/auth.module';
import {LoggerMiddleware} from "./logger/logger.middleware";

@Module({
  imports: [PatientModule, AppointmentModule, PatientAppointmentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
