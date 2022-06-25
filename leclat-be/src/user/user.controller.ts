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
import { UserDto } from 'src/dto/user.dto';
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

  @Post()
  addUser(@Body() dto: UserDto) {
    return this.userService.addUser(dto);
  }

  @Patch(':id')
  editUser(@Param('id', ParseUUIDPipe) userId: string, @Body() dto: UserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.deleteUser(userId);
  }
}
