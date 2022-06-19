import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';

import { ClassService } from './class.service';

@UseGuards(JwtGuard)
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getClasses(): any {
    return this.classService.getClasses();
  }
}
