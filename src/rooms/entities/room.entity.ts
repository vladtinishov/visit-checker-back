import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { Event } from '../../events/entities/event.entity';
import { EventVisit } from '../../events/entities/event-visit.entitiy';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id?: number;

  @PrimaryColumn({ unique: false })
  groupId?: number;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.room, { cascade: true, eager: true })
  events: Event[];

  @OneToMany(() => EventVisit, (eventVisit) => eventVisit.room, {
    eager: true,
  })
  eventVisits: EventVisit[];

  @ManyToOne(() => Group, (group) => group.rooms)
  group: Group;
}
