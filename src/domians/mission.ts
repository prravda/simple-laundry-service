import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreateMissionDto {}

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;
}
