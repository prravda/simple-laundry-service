import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Task } from './task';
import { Information } from './information';

export interface CreateAddressDto {
  addressLineOne: string;
  addressLineTwo: string;
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressLineOne: string;

  @Column()
  addressLineTwo: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @OneToOne((type) => Task, (task) => task.address)
  task: Task;
}
