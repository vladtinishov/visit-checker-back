import {
  Controller,
  Get,
  UploadedFile,
  Post,
  UseInterceptors,
  Param,
} from '@nestjs/common';
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

  @Post('/webhook/:roomId')
  @UseInterceptors(FileInterceptor('file'))
  handleWeebhook(
    @UploadedFile() file: Express.Multer.File,
    @Param('roomId') roomId: number,
  ) {
    return this.service.handleWebhook(file, roomId);
  }
}
