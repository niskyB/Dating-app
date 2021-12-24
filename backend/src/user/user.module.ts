import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//---- entity
import { UserHighLightImg } from './entities/userHighlightImg.entity';
import { Hobby } from './entities/userHobbies.entity';

//---- module
import { AuthModule } from '../auth/auth.module';

//---- service
import { UserService } from './user.service';

//---- controller
import { UserController } from './user.controller';

//---- repository
import { UserRepository } from './entities/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserHighLightImg, Hobby]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
