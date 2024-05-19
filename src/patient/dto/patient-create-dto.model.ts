import { ApiProperty } from '@nestjs/swagger';

export class PatientCreateDto {
    @ApiProperty({ example: 'John' })
    name: string;

    @ApiProperty({ example: 'Doe' })
    last_name: string;

    @ApiProperty({ example: '2000-01-01T00:00:00.000Z', format: 'date-time'})
    date_of_birth: Date;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: '123 456 789' })
    phone_number?: string;
}