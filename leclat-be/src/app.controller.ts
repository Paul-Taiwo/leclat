import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TWelcome } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): TWelcome {
    return this.appService.getHello();
  }
}
