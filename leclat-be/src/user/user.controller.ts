import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getUsers() {
    return this.userService.getUsers();
  }
}
