import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventVisit } from './entities/event-visit.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventVisit])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
