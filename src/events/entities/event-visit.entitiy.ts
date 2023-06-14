import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entity/user.entity';
import { Group } from '../../groups/entities/group.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('events_visits')
export class EventVisit {
  @PrimaryGeneratedColumn()
  id?: number;

  @PrimaryColumn({ unique: false })
  groupId?: number;

  @PrimaryColumn({ unique: false })
  roomId?: number;

  @PrimaryColumn({ unique: false })
  eventId?: number;

  @PrimaryColumn({ unique: false })
  userId?: number;

  @Column()
  lateTime: number;

  @ManyToOne(() => Room, (room) => room.eventVisits, { cascade: true })
  @JoinColumn({ referencedColumnName: 'id' })
  room?: Room;

  @ManyToOne(() => Event, (event) => event.eventVisits, { cascade: true })
  @JoinColumn({ referencedColumnName: 'id' })
  event?: Event;

  @ManyToOne(() => User, (user) => user.eventVisits, { cascade: true })
  @JoinColumn({ referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Group, (group) => group.eventVisits, { cascade: true })
  @JoinColumn({ referencedColumnName: 'id' })
  group?: Group;
}
