import { Injectable } from '@nestjs/common';

import { UserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async getClasses() {
    const classes = await this.prisma.class.findMany({
      include: {
        Course: true,
        User: true,
      },
    });
    return {
      classes,
    };
  }

  async getClass({ classId }: UserDto) {
    const classes = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
      include: {
        Course: true,
      },
    });

    return {
      message: 'success',
      data: { ...classes },
    };
  }
}
