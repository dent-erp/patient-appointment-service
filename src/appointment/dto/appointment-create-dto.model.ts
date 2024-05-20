import {ApiProperty} from "@nestjs/swagger";

export class AppointmentCreateDto {
    @ApiProperty({example: '2000-01-01T00:00:00.000Z', format: 'date-time'})
    start_date: Date;

    @ApiProperty({example: '2000-01-01T01:00:00.000Z', format: 'date-time'})
    end_date: Date;

    @ApiProperty({example: 'Examination'})
    type: string;
}