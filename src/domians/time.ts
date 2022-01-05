import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreateTimeDto {
  pickup: Date;
  delivery: Date;
}

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickUp: Date;

  @Column()
  delivery: Date;
}
