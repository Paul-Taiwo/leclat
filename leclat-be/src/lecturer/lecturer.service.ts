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

  async addLecturer(dto: LecturerDto) {
    try {
      const lecturer = await this.prisma.lecturer.create({
        data: {
          ...dto,
        },
      });

      return {
        message: 'Lecturer Created',
        data: lecturer,
      };
    } catch (error) {
      throw error;
    }
  }

  async editLecturer(lecturerId: string, dto: LecturerDto) {
    /* Updating the lecturer with the new data. */
    const updatedLecturer = await this.prisma.lecturer.update({
      where: {
        id: lecturerId,
      },
      data: {
        ...dto,
      },
    });

    return {
      message: 'Lecturer updated successfully',
      data: { ...updatedLecturer },
    };
  }

  async deleteLecturer(lecturerId: string) {
    /* Deleting the lecturer. */
    await this.prisma.lecturer.delete({
      where: {
        id: lecturerId,
      },
    });

    return {
      message: 'Lecturer deleted successfully',
    };
  }
}
