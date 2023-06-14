import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { generateUniqueString } from '../../../utils/helpers';
import {Room} from "../../rooms/entities/room.entity";
import {EventVisit} from "../../events/entities/event-visit.entitiy";

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  code?: string;

  @Column({ nullable: true })
  owner?: number;

  @OneToMany(() => User, (user) => user.group, { cascade: true, eager: true })
  users: User[];

  @OneToMany(() => Room, (room) => room.group, { cascade: true, eager: true })
  rooms: Room[];

  @OneToMany(() => EventVisit, (eventVisit) => eventVisit.group, {
    eager: true,
  })
  eventVisits: EventVisit[];

  @BeforeInsert()
  async hashCode() {
    this.code = generateUniqueString();
  }
}
