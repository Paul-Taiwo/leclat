import { Injectable } from '@nestjs/common';

import { TWelcome } from './interfaces';

@Injectable()
export class AppService {
  getHello(): TWelcome {
    return { message: 'Leclat API Live' };
  }
}
