import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  userId: number;

  @Column()
  size: number;

  @Column()
  destination: string;

  @Column()
  extension: string;

  @Column('json')
  data: object;
}
