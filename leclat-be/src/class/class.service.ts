import { Injectable } from '@nestjs/common';

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
}
