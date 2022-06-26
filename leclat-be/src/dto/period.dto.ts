import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class PeriodDto {
  @IsNotEmpty()
  day: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
