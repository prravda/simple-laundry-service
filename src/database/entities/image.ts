import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item';

export interface CreateImageDto {
  imageId: string;
  imageUrl: string;
}

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageId: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Item, (item) => item.images)
  item: Item;
}
