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

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToOne((type) => Address, (address) => address.task, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

  @OneToOne((type) => Information, (information) => information.task, {
    cascade: true,
  })
  @JoinColumn()
  information: Information;

  @OneToOne((type) => Mission, (mission) => mission.task, {
    cascade: true,
  })
  @JoinColumn()
  mission: Mission;
}
