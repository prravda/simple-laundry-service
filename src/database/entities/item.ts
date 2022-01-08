import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mission } from './mission';
import { CreateImageDto, Image } from './image';
import { CreateTagDto, Tag } from './tag';

export interface CreateItemDto {
  name: string;
  message: string;
  representativeItemImage: string;
}

export interface CreateItemWithCreateImageListAndTagList extends CreateItemDto {
  createImageListDto: CreateImageDto[];
  createTagListDto: string[];
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  message: string;

  @Column()
  representativeItemImage: string;

  @OneToMany(() => Image, (image) => image.item, {
    cascade: true,
  })
  images: Image[];

  @OneToMany(() => Tag, (tag) => tag.item, {
    cascade: true,
  })
  tagList: Tag[];

  @ManyToOne(() => Mission, (mission) => mission.items)
  mission: Mission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
