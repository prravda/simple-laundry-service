import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Address } from './address';
import { Information } from './information';
import { Mission } from './mission';

export interface CreateTaskDto {
  taskId: number;
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToOne((type) => Address, (address) => address.task)
  @JoinColumn()
  address: Address;

  @OneToOne((type) => Information, (information) => information.task)
  @JoinColumn()
  information: Information;

  @OneToOne((type) => Mission, (mission) => mission.task)
  @JoinColumn()
  mission: Mission;
}
