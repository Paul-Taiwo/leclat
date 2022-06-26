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
import { PeriodDto } from 'src/dto/period.dto';
import { Role } from 'src/enum';

import { PeriodService } from './period.service';

@UseGuards(JwtGuard)
@Controller('periods')
export class PeriodController {
  constructor(private readonly courseService: PeriodService) {}

  @Get()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getPeriods() {
    return this.courseService.getPeriods();
  }

  @Post()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  addPeriod(@Body() dto: PeriodDto) {
    return this.courseService.addPeriod(dto);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  editPeriod(
    @Param('id', ParseUUIDPipe) courseId: string,
    @Body() dto: PeriodDto,
  ) {
    return this.courseService.editPeriod(courseId, dto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  deletePeriod(@Param('id', ParseUUIDPipe) courseId: string) {
    return this.courseService.deletePeriod(courseId);
  }
}
