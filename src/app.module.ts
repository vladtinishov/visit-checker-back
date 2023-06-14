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
      host: 'containers-us-west-34.railway.app',
      port: 6037,
      username: 'root',
      password: 'tj38u4J6lwQbicCk59Yt',
      database: 'railway',
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      logging: false,
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
