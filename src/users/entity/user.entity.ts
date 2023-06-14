import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn, OneToMany,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import {EventVisit} from "../../events/entities/event-visit.entitiy";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: false })
  groupId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  login: string;

  @Column({ length: 255 })
  password: string;

  lateTime?: number;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;

  @OneToMany(() => EventVisit, (eventVisit) => eventVisit.user, {
    eager: true,
  })
  eventVisits: EventVisit[];
}
