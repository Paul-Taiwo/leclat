import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guard/role.guard';

import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  controllers: [ClassController],
  providers: [
    ClassService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ClassModule {}
