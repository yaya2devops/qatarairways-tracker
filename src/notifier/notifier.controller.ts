import { Controller, Post } from '@nestjs/common';
import { NotifierService } from './notifier.service';

@Controller('notifier')
export class NotifierController {
  constructor(private readonly notifier: NotifierService) {}

  @Post('test')
  async test() {
    await this.notifier.sendTestEmail();
    return { message: 'Test email sent — check your inbox.' };
  }
}
