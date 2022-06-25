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
    /* Hashing the password. */
    const password = await hash('password');

    try {
      /* Checking if the class has a user. */
      const { User } = await this.prisma.class.findUnique({
        where: {
          id: classId,
        },
        select: {
          User: true,
        },
      });

      /* Checking if the class has a user. */
      if (User && User.length) {
        throw new BadRequestException('Class can only have one user');
      }

      /* Checking if the user with the email already exists. */
      const userInDb = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      /* Checking if the user with the email already exists. */
      if (userInDb) {
        throw new BadRequestException(
          `User with email: ${email} is already attached to a class`,
        );
      }

      /* Creating a user. */
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          phone,
          classId,
          password,
        },
      });

      /* Deleting the password from the user object before returning it. */
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

  async editUser(userId: string, dto: UserDto) {
    // get the user by id
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    /* Checking if the user exists. */
    if (user === null) {
      throw new BadRequestException(`No user with id:${userId} found`);
    }

    /* Updating the user with the new data. */
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    /* Deleting the password from the user object before returning it. */
    delete updatedUser.password;

    return {
      message: 'User updated successfully',
      user: { ...updatedUser },
    };
  }

  async deleteUser(userId: string) {
    // get the user by id
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    /* Checking if the user exists. */
    if (user === null) {
      throw new BadRequestException(`No user with id:${userId} found`);
    }

    /* Deleting the user. */
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return {
      message: 'User deleted successfully',
    };
  }
}
