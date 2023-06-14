import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto, FindCriteria, UpdateGroupDto } from './dto/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly repo: Repository<Group>,
  ) {}

  async findAll(dto: FindCriteria = {}): Promise<Group[]> {
    return this.repo.find({ where: dto, relations: ['users'] });
  }

  async findOne(dto: FindCriteria): Promise<Group> {
    return this.repo.findOne({ where: dto, relations: ['users'] });
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.repo.create(createGroupDto);
    return this.repo.save(group);
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.repo.update(id, updateGroupDto);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
