import { PrimaryGeneratedColumn } from 'typeorm';

export interface CreateTaskDto {
  taskId: number;
}

export class Task {
  @PrimaryGeneratedColumn()
  id: number;
}
