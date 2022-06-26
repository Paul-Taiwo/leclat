import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { LecturerDto } from 'src/dto/lecturer.dto';
import { Role } from 'src/enum';

import { LecturerService } from './lecturer.service';

@UseGuards(JwtGuard)
@Controller('lecturers')
export class LecturerController {
  constructor(private readonly courseService: LecturerService) {}

  @Get()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getLecturers() {
    return this.courseService.getLecturers();
  }

  // @Post()
  // @Roles(Role.USER)
  // @UseGuards(RolesGuard)
  // addLecturer(@Body() dto: LecturerDto) {
  //   return this.courseService.addLecturer(dto);
  // }

  // @Patch(':id')
  // @Roles(Role.USER)
  // @UseGuards(RolesGuard)
  // editLecturer(
  //   @Param('id', ParseUUIDPipe) courseId: string,
  //   @Body() dto: LecturerDto,
  // ) {
  //   return this.courseService.editLecturer(courseId, dto);
  // }

  // @Delete(':id')
  // @Roles(Role.USER)
  // @UseGuards(RolesGuard)
  // deleteLecturer(@Param('id', ParseUUIDPipe) courseId: string) {
  //   return this.courseService.deleteLecturer(courseId);
  // }
}
