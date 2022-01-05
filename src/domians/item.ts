import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
