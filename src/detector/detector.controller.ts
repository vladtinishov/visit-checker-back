import {Body, Controller, Get, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { DetectorService } from './detector.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('detector')
export class DetectorController {
  constructor(private readonly service: DetectorService) {}
  @Get('/compare-test')
  testComparing() {
    return this.service.compareFacesTest();
  }

  @Post('/compare')
  @UseInterceptors(FileInterceptor('file'))
  compare(@UploadedFile() file: Express.Multer.File) {
    return this.service.getDataByFace(file);
  }
}
