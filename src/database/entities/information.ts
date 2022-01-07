import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task';
import { Time } from './time';
import { Address } from './address';

export interface CreateInformationDto {
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
  time: Time;

  @OneToOne((type) => Address, (address) => address.information, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
