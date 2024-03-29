import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Information } from './information';

export interface CreateTimeDto {
  pickup: Date;
  pickupEnd: Date;
  delivery: Date;
  deliveryEnd: Date;
}

export interface UpdateTimeByTimeIdDto extends Partial<CreateTimeDto> {
  id: number;
}

export interface FindTimeByTimeId {
  id: number;
}

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickup: Date;

  @Column()
  pickupEnd: Date;

  @Column()
  delivery: Date;

  @Column()
  deliveryEnd: Date;

  @OneToOne((type) => Information, (information) => information.time)
  @JoinColumn()
  information: Information;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
