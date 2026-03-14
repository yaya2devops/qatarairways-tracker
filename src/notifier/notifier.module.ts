import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { NotifierController } from './notifier.controller';

@Module({
  providers: [NotifierService],
  controllers: [NotifierController],
  exports: [NotifierService],
})
export class NotifierModule {}
