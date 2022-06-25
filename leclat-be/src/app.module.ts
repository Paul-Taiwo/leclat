import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClassModule } from './class/class.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ClassService } from './class/class.service';
import { CourseService } from './user copy/course.service';
import { CourseModule } from './user copy/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ClassModule,
    UserModule,
    CourseModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, ClassService, CourseService],
})
export class AppModule {}
