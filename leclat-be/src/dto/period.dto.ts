import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PeriodDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
