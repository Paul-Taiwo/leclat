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
import { GetUser } from 'src/decorators';
import { Roles } from 'src/decorators/role.decorator';
import { CourseDto } from 'src/dto/course.dto';
import { UserDto } from 'src/dto/user.dto';
import { Role } from 'src/enum';

import { CourseService } from './course.service';

@UseGuards(JwtGuard)
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getCourses(@GetUser() { classId }: UserDto) {
    return this.courseService.getCourses(classId);
  }

  @Post()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  addCourse(@Body() dto: CourseDto) {
    return this.courseService.addCourse(dto);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  editCourse(
    @Param('id', ParseUUIDPipe) courseId: string,
    @Body() dto: CourseDto,
  ) {
    return this.courseService.editCourse(courseId, dto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  deleteCourse(@Param('id', ParseUUIDPipe) courseId: string) {
    return this.courseService.deleteCourse(courseId);
  }
}
