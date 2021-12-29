import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [AuthModule],
  providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
