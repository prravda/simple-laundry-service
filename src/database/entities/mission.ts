import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item';
import { Task } from './task';

export interface CreateMissionDto {}

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Item, (item) => item.mission)
  items: Item[];

  @OneToOne((type) => Task, (task) => task.mission)
  task: Task;
}
