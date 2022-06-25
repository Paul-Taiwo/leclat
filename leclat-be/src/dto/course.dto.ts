import { IsNotEmpty, IsString } from 'class-validator';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  classId: string;
}
