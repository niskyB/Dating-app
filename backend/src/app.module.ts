// module
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

// config
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// service
import { AppService } from './app.service';

// entity
import { User } from './user/entities/user.entity';

const Config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `./config/.env.` + process.env.NODE_ENV,
});

const DBConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});

@Module({
  imports: [
    // -- Configs
    Config,
    DBConfig,

    // -- Modules
    UserModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
