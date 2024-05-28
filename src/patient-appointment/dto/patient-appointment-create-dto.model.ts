import {PatientCreateDto} from "../../patient/dto/patient-create-dto.model";
import {AppointmentRequestDto} from "../../appointment/dto/appointment-request-dto.model";
import {ApiProperty} from "@nestjs/swagger";

export class PatientAppointmentCreateDto {
    @ApiProperty({
        type: PatientCreateDto,
        example: {
            name: 'John',
            last_name: 'Doe',
            date_of_birth: '2000-01-01T00:00:00.000Z',
            email: 'john.doe@example.com',
            phone_number: '023 456 789'
        }
    })
    patient: PatientCreateDto;

    @ApiProperty({
        type: AppointmentRequestDto,
        example: {
            start_date: '2021-01-01T00:00:00.000Z',
            end_date: '2021-01-01T00:30:00.000Z',
            type: 'Checkup'
        }
    })
    appointment: AppointmentRequestDto;
}