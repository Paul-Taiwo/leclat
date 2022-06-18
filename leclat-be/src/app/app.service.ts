import { Injectable } from '@nestjs/common';
import { TWelcome } from './app.types';

@Injectable()
export class AppService {
  getHello(): TWelcome {
    return { message: 'Leclat API Live' };
  }
}
