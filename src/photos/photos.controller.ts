import {
  Controller,
  UploadedFile,
  Post,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './src/photos/uploaded',
        filename: (req, file, cb) => {
          req.files;
          const suffix = Date.now() + '-' + Math.round(Math.random() + 1e9);
          const ext = extname(file.originalname);
          const filename = `${suffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    return this.photosService.upload(file, JSON.parse(data));
  }
}
