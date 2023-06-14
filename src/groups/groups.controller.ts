import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto, FindCriteria, UpdateGroupDto } from './dto/group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async findAll(@Query() dto: FindCriteria) {
    return this.groupsService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.groupsService.findOne({ id });
  }

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.groupsService.remove(id);
  }
}
