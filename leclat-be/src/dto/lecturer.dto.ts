import { IsNotEmpty, IsString } from 'class-validator';

export class LecturerDto {
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
