import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PhotoDataDto } from '../photos/dto/photo-data.dto';
import {
  convertFileToBase64,
  getAllFilesFromDirectory,
  getFilePath,
} from '../../utils/files';
import { PhotosService } from '../photos/photos.service';
import { ImageSimilarityDto } from '../photos/dto/image-similarity.dto';
import { sortByField } from '../../utils/helpers';
import { faceDetectApi } from '../api/face-detect/face-detect';
import * as FormData from 'form-data';
import { EventsService } from '../events/events.service';
import { RoomsService } from '../rooms/rooms.service';
import {getCurrentTime, getTimeDifference} from "../../utils/time";

@Injectable()
export class DetectorService {
  constructor(
    private photosService: PhotosService,
    private eventsService: EventsService,
    private roomsService: RoomsService,
  ) {}

  async compareFacesTest(): Promise<number> {
    return 1;
  }

  async getSimilarityImages(image: Express.Multer.File) {
    const filesPath = getAllFilesFromDirectory('./src/photos/uploaded/');
    const resultImages: ImageSimilarityDto[] = [];
    for (const imageName of filesPath) {
      const imagePath = getFilePath('./src/photos/uploaded/', imageName);
      const formData = new FormData();

      const face1 = convertFileToBase64(fs.readFileSync(imagePath));
      const face2 = convertFileToBase64(image.buffer);

      formData.append('face1', face1);
      formData.append('face2', face2);

      const result = await faceDetectApi.compareFace(formData);

      if (result.similar) {
        resultImages.push({ similarity: result.score, imageName });
      }
    }
    return resultImages;
  }

  async getDataByFace(image: Express.Multer.File): Promise<PhotoDataDto> {
    const similarImages: ImageSimilarityDto[] = await this.getSimilarityImages(
      image,
    );

    if (!similarImages.length) return {};

    const mostSimilar = sortByField(similarImages, 'similarity', 'desc')[0];
    const photo = await this.photosService.getOneByName(mostSimilar.imageName);

    return photo.data;
  }

  async handleWebhook(image: Express.Multer.File, roomId: number) {
    const imageData = await this.getDataByFace(image);
    const room = await this.roomsService.findOne(roomId);
    const currentEvent = await this.eventsService.getCurrentEvent(roomId);

    if (!currentEvent) return { error: 'Event is not found' };

    return await this.eventsService.setReport({
      roomId,
      userId: imageData.id,
      groupId: room.groupId,
      eventId: currentEvent.id,
      lateTime: getTimeDifference(getCurrentTime(), currentEvent.startTime),
    });
  }
}
