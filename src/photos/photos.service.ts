import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname } from 'path';
import { In, Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { PhotoDataDto } from './dto/photo-data.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private repo: Repository<Photo>,
  ) {}

  getObjectToSave(file: Express.Multer.File, data: PhotoDataDto) {
    console.log(file)
    return {
      userId: 1,
      name: file.filename,
      destination: file.destination,
      extension: extname(file.originalname),
      path: file.path,
      size: file.size,
      data,
    };
  }

  async upload(file: Express.Multer.File, data: PhotoDataDto): Promise<Photo> {
    const objToSave = this.getObjectToSave(file, data);
    return this.repo.save(objToSave);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }

  async getOneByName(name: string): Promise<Photo> {
    return this.repo.findOne({ where: { name } });
  }
}
