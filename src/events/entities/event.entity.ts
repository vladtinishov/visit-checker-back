import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { EventVisit } from './event-visit.entitiy';
import { User } from '../../users/entity/user.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: false })
  roomId?: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Room, (room) => room.events)
  @JoinColumn({ referencedColumnName: 'id' })
  room: Room;

  @OneToMany(() => EventVisit, (eventVisit) => eventVisit.room, {
    eager: true,
  })
  eventVisits: EventVisit[];

  users: User[];
}
