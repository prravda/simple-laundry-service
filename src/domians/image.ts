import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
