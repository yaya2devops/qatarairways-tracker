import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrSession } from './entities/qr-session.entity';
import { SessionService } from './session.service';
import { CookieRefresherService } from './cookie-refresher.service';
import { SessionController } from './session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QrSession])],
  providers: [SessionService, CookieRefresherService],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionModule {}
