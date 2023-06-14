import { Module } from '@nestjs/common';
import { DetectorController } from './detector.controller';
import { DetectorService } from './detector.service';
import { PhotosService } from 'src/photos/photos.service';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [PhotosModule],
  controllers: [DetectorController],
  providers: [DetectorService]
})
export class DetectorModule {}
