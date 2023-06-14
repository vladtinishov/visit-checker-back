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
import { RoomsService } from './rooms.service';
import { Create, FindCriteriaDto, Update } from './dto/room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Get()
  async findAll(@Query() dto: FindCriteriaDto) {
    return this.roomService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }

  @Post()
  async create(@Body() createRoomDto: Create) {
    return this.roomService.create(createRoomDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRoomDto: Update) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}
