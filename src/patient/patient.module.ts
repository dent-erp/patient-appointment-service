import {Module} from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService]
})
export class PatientModule {}
