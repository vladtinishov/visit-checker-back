import { Injectable } from '@nestjs/common';
import {CreateUserDto, FindCriteria, UpdateUserDto} from './dto/user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(criteria: FindCriteria) {
    return this.repo.findOne({ where: { ...criteria } });
  }

  create(dto: CreateUserDto) {
    return this.repo.save(dto);
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
