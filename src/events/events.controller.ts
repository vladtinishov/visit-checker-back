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
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventsService } from './events.service';
import { EventReportDto, GetEventsReportsDto } from './dto/event-report.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Post('/reports')
  async setReport(@Body() dto: EventReportDto) {
    return this.service.setReport(dto);
  }

  @Get('/reports')
  async getReports(@Query() dto: GetEventsReportsDto) {
    return this.service.getReports(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
