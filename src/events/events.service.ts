import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventReportDto, GetEventsReportsDto } from './dto/event-report.dto';
import { EventVisit } from './entities/event-visit.entitiy';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entity/user.entity';
import { getCurrentDate, isBetween } from '../../utils/time';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
    @InjectRepository(EventVisit)
    private readonly eventVisit: Repository<EventVisit>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Event> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.repo.create(dto);
    return this.repo.save(event);
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete({ id });
  }

  async setReport(dto: EventReportDto) {
    return this.eventVisit.save(dto);
  }

  async getReports(dto: GetEventsReportsDto) {
    const query = this.repo
      .createQueryBuilder('event')
      .where('report.groupId = :groupId', { groupId: dto.groupId })
      .leftJoinAndMapOne('event.room', Room, 'room', 'room.id = event.roomId')
      .leftJoin(EventVisit, 'report', 'event.id = report.eventId')
      .leftJoinAndMapMany(
        'event.users',
        User,
        'user',
        'user.id = report.userId',
      );

    if (dto.date) query.andWhere('event.date = :date', { date: dto.date });
    if (dto.roomId)
      query.andWhere('report.roomId = :roomId', { date: dto.roomId });

    const result = await query.getMany();

    for (const event of result) {
      for (const user of event.users) {
        const eventVisit = await this.eventVisit.findOne({
          where: { userId: user.id },
        });

        user.lateTime = eventVisit.lateTime;
      }
    }

    return result;
  }

  async getCurrentEvent(roomId: number) {
    const currentDate = getCurrentDate();
    const events = await this.repo.find({
      where: { roomId, date: currentDate },
    });

    console.log({ currentDate })
    console.log({ events })

    const currentEvent = events.find((event: Event) => {
      return isBetween(event.startTime, event.endTime);
    });

    if (currentEvent) return currentEvent;

    return undefined;
  }
}
