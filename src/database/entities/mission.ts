import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item';
import { Task } from './task';

export interface CreateMissionDto {}

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Item, (item) => item.mission, {
    cascade: true,
  })
  items: Item[];

  @OneToOne((type) => Task, (task) => task.mission)
  task: Task;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
