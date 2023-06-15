import { Module } from '@nestjs/common';
import { DetectorController } from './detector.controller';
import { DetectorService } from './detector.service';
import { PhotosService } from 'src/photos/photos.service';
import { PhotosModule } from 'src/photos/photos.module';
import { EventsModule } from '../events/events.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [PhotosModule, EventsModule, RoomsModule],
  controllers: [DetectorController],
  providers: [DetectorService],
})
export class DetectorModule {}
