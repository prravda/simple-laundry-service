import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item';

export interface CreateTagDto {
  tagName: string;
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @ManyToOne(() => Item, (item) => item.tagList)
  item: Item;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
