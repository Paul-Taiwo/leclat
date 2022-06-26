import { Injectable, Logger } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(@InjectTwilio() private readonly client: TwilioClient) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  async sendSMS() {
    try {
      const message = await this.client.messages.create({
        body: 'Testing Lectlat SMS Body, sent to the phone!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+2348108268238',
      });

      this.logger.log(message);
      return message;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}
