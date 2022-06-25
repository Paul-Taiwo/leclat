import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CourseDto {
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
  classId: string;
}
