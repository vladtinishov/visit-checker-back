import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { Create, Update, FindCriteriaDto } from './dto/room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findAll(dto: FindCriteriaDto): Promise<Room[]> {
    return this.roomRepository.find({ where: dto, relations: ['events'] });
  }

  async findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async create(createRoomDto: Create): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async update(id: number, updateRoomDto: Update): Promise<Room> {
    await this.roomRepository.update(id, updateRoomDto);
    return this.roomRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete({ id });
  }
}
