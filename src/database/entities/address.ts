import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Information } from './information';

export interface CreateAddressDto {
  addressLineOne: string;
  addressLineTwo: string;
}

export interface FindAddressWithIdDto {
  id: number;
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressLineOne: string;

  @Column()
  addressLineTwo: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @OneToOne((type) => Information, (information) => information.address)
  information: Information;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
