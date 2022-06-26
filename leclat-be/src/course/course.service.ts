import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash } from 'argon2';

import { CourseDto } from 'src/dto/course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getCourses() {
    const courses = await this.prisma.course.findMany({
      include: {
        Lecturer: true,
        Period: true,
      },
    });

    return {
      message: 'success',
      data: courses,
    };
  }

  // async addCourse({ email, name, phone, classId }: CourseDto) {
  //   /* Hashing the password. */
  //   const password = await hash('password');

  //   try {
  //     /* Checking if the class has a user. */
  //     const { Course } = await this.prisma.class.findUnique({
  //       where: {
  //         id: classId,
  //       },
  //       select: {
  //         Course: true,
  //       },
  //     });

  //     /* Checking if the class has a user. */
  //     if (Course && Course.length) {
  //       throw new BadRequestException('Class can only have one user');
  //     }

  //     /* Checking if the user with the email already exists. */
  //     const userInDb = await this.prisma.user.findUnique({
  //       where: {
  //         email,
  //       },
  //     });

  //     /* Checking if the user with the email already exists. */
  //     if (userInDb) {
  //       throw new BadRequestException(
  //         `Course with email: ${email} is already attached to a class`,
  //       );
  //     }

  //     /* Creating a user. */
  //     const user = await this.prisma.user.create({
  //       data: {
  //         email,
  //         name,
  //         phone,
  //         classId,
  //         password,
  //       },
  //     });

  //     /* Deleting the password from the user object before returning it. */
  //     delete user.password;

  //     return {
  //       message: 'Course Created',
  //       data: user,
  //     };
  //   } catch (error) {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         throw new ForbiddenException('Credentials taken');
  //       }
  //     }
  //     throw error;
  //   }
  // }

  // async editCourse(userId: string, dto: CourseDto) {
  //   // get the user by id
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   /* Checking if the user exists. */
  //   if (user === null) {
  //     throw new BadRequestException(`No user with id:${userId} found`);
  //   }

  //   /* Updating the user with the new data. */
  //   const updatedCourse = await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       ...dto,
  //     },
  //   });

  //   /* Deleting the password from the user object before returning it. */
  //   delete updatedCourse.password;

  //   return {
  //     message: 'Course updated successfully',
  //     user: { ...updatedCourse },
  //   };
  // }

  // async deleteCourse(userId: string) {
  //   // get the user by id
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   /* Checking if the user exists. */
  //   if (user === null) {
  //     throw new BadRequestException(`No user with id:${userId} found`);
  //   }

  //   /* Deleting the user. */
  //   await this.prisma.user.delete({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   return {
  //     message: 'Course deleted successfully',
  //   };
  // }
}
