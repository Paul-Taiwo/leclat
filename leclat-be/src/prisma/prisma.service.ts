import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.admin.deleteMany(),
      this.user.deleteMany(),
      this.class.deleteMany(),
      this.course.deleteMany(),
      this.lecturer.deleteMany(),
      this.period.deleteMany(),
    ]);
  }
}
