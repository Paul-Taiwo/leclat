import { Injectable } from '@nestjs/common';
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
}
