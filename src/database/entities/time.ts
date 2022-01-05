import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Information } from './information';

export interface CreateTimeDto {
  pickup: Date;
  delivery: Date;
}

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickUp: Date;

  @Column()
  delivery: Date;

  @OneToOne((type) => Information, (information) => information.time)
  @JoinColumn()
  information: Information;
}
