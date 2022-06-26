import { Injectable } from '@nestjs/common';

import { CourseDto } from 'src/dto/course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getCourses(classId: string) {
    const courses = await this.prisma.course.findMany({
      where: {
        classId,
      },
      include: {
        Lecturer: true,
        Period: true,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
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

  async editCourse(courseId: string, dto: CourseDto) {
    /* Updating the course with the new data. */
    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...dto,
      },
    });

    return {
      message: 'Course updated successfully',
      data: { ...updatedCourse },
    };
  }

  async deleteCourse(courseId: string) {
    /* Deleting the course. */
    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return {
      message: 'Course deleted successfully',
    };
  }
}
