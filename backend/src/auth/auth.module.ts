import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//---- module
import { UserModule } from '../user/user.module';

//---- controller
import { AuthController } from './auth.controller';

//---- service
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: JwtService,
      useFactory: () => {
        return new JwtService({ secret: process.env.JWT_SECRET });
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
