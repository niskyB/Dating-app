import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

const Config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `./config/.env.` + process.env.NODE_ENV,
});

@Module({
  imports: [Config, UserModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
