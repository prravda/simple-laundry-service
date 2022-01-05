import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task';
import { Address } from './address';
import { Time } from './time';

export interface CreateInformationDto {
  addressLineOne: string;
  addressLineTwo: string;
  location: string;
}

@Entity()
export class Information {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Task, (task) => task.information)
  task: Task;

  @OneToOne((type) => Time, (time) => time.information, {
    cascade: true,
  })
  @JoinColumn()
  time: Time;
}
