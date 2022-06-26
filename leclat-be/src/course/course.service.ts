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

  async addCourse({ name, code, classId }: CourseDto) {
    try {
      // TODO: Check course code uniqueness
      const course = await this.prisma.course.create({
        data: {
          name,
          code,
          classId,
        },
      });

      return {
        message: 'Course Created',
        data: course,
      };
    } catch (error) {
      throw error;
    }
  }

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
