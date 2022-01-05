import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mission } from './mission';
import { Image } from './image';
import { Tag } from './tag';

export interface CreateItemDto {
  name: string;
  message: string;
  representativeItemImage: string;
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
  tags: Tag[];

  @ManyToOne(() => Mission, (mission) => mission.items)
  mission: Mission;
}
