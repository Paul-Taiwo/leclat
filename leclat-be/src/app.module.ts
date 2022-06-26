import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClassModule } from './class/class.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ClassService } from './class/class.service';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { LecturerService } from './lecturer/lecturer.service';
import { PeriodModule } from './period/period.module';
import { PeriodService } from './period/period.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    AuthModule,
    PrismaModule,
    ClassModule,
    UserModule,
    CourseModule,
    LecturerModule,
    PeriodModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    ClassService,
    CourseService,
    LecturerService,
    PeriodService,
  ],
})
export class AppModule {}
