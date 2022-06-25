import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { GetUser } from 'src/decorators';
import { Roles } from 'src/decorators/role.decorator';
import { UserDto } from 'src/dto/user.dto';
import { Role } from 'src/enum';

import { ClassService } from './class.service';

@UseGuards(JwtGuard)
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getClasses() {
    return this.classService.getClasses();
  }

  @Get('me')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getClassByUserId(@GetUser() user: UserDto) {
    return this.classService.getClass(user);
  }
}
