import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash } from 'argon2';

import { UserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        class: true,
      },
    });
    const filteredUser = users.map((user) => {
      const userObj = { ...user };
      delete userObj.password;
      return userObj;
    });

    return {
      users: filteredUser,
    };
  }

  async addUser({ email, name, phone, classId }: UserDto) {
    const password = await hash('password');

    try {
      const { User } = await this.prisma.class.findUnique({
        where: {
          id: classId,
        },
        select: {
          User: true,
        },
      });

      if (User && User.length) {
        throw new BadRequestException('Class can only have one user');
      }

      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          phone,
          classId,
          password,
        },
      });

      delete user.password;

      return {
        message: 'User Created',
        data: user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
