import { Module } from '@nestjs/common';
import { DetectorModule } from './detector/detector.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { GroupsModule } from './groups/groups.module';
import { EventsModule } from './events/events.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    DetectorModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env[`DB_HOST_${process.env.MODE.toUpperCase()}`],
      port: parseInt(process.env[`DB_PORT_${process.env.MODE.toUpperCase()}`]),
      username: process.env[`DB_USER_${process.env.MODE.toUpperCase()}`],
      password: process.env[`DB_PASSWORD_${process.env.MODE.toUpperCase()}`],
      database: process.env[`DB_NAME_${process.env.MODE.toUpperCase()}`],
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      logging:
        +process.env[`DB_LOG_QUERY_${process.env.MODE.toUpperCase()}`] == 1,
      bigNumberStrings: false,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    PhotosModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    GroupsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
