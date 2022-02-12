import { join } from 'path';

//---- module
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MatchModule } from './match/match.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ServeStaticModule } from '@nestjs/serve-static';

//---- config
import { TypeOrmModule } from '@nestjs/typeorm';

//---- service
import { AppService } from './app.service';

//---- entity
import { User } from './user/entities/user.entity';
import { UserHighLightImg } from './user/entities/userHighlightImg.entity';
import { Hobby } from './user/entities/userHobbies.entity';
import { UserShowOption } from './user/entities/userShowOption.entity';
import { UserFindOption } from './user/entities/userFindOption.entity';
import { Message } from './chat/entities/message.entity';

const DBConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [
    User,
    UserHighLightImg,
    Hobby,
    UserShowOption,
    UserFindOption,
    Message,
  ],
});

@Module({
  imports: [
    // -- Configs
    DBConfig,
    // EnvConfig,
    // -- Modules
    UserModule,
    AuthModule,
    MatchModule,
    NotificationsModule,
    ChatModule,

    // -- serve static folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
