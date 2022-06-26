import { Injectable } from '@nestjs/common';

import { LecturerDto } from 'src/dto/lecturer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LecturerService {
  constructor(private prisma: PrismaService) {}

  async getLecturers() {
    const lecturers = await this.prisma.lecturer.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });

    return {
      message: 'success',
      data: lecturers,
    };
  }

  // async addLecturer({ name, code, classId }: LecturerDto) {
  //   try {
  //     // TODO: Check course code uniqueness
  //     const course = await this.prisma.course.create({
  //       data: {
  //         name,
  //         code,
  //         classId,
  //       },
  //     });

  //     return {
  //       message: 'Lecturer Created',
  //       data: course,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async editLecturer(courseId: string, dto: LecturerDto) {
  //   /* Updating the course with the new data. */
  //   const updatedLecturer = await this.prisma.course.update({
  //     where: {
  //       id: courseId,
  //     },
  //     data: {
  //       ...dto,
  //     },
  //   });

  //   return {
  //     message: 'Lecturer updated successfully',
  //     data: { ...updatedLecturer },
  //   };
  // }

  // async deleteLecturer(courseId: string) {
  //   /* Deleting the user. */
  //   await this.prisma.course.delete({
  //     where: {
  //       id: courseId,
  //     },
  //   });

  //   return {
  //     message: 'Lecturer deleted successfully',
  //   };
  // }
}
