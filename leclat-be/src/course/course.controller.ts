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
import { CourseDto } from 'src/dto/course.dto';
import { Role } from 'src/enum';
import { CourseService } from './course.service';

@UseGuards(JwtGuard)
@Controller('users')
export class CourseController {
  constructor(private readonly userService: CourseService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getCourses() {
    return this.userService.getCourses();
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  addCourse(@Body() dto: CourseDto) {
    return this.userService.addCourse(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  editCourse(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: CourseDto,
  ) {
    return this.userService.editCourse(userId, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteCourse(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.deleteCourse(userId);
  }
}
