import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserGenders } from '../../components/user/types/user-genders';
import { isActivatedUser } from '../../components/user/types/is-activated.user';
import { Credential } from './credential';
import { Address } from './address';
import { Task } from './task';

export interface CreateUserDto {
  name: string;
  nickname: string;
  cellPhoneNumber: string;
  gender: UserGenders;
}

@Entity()
export class User {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  cellPhoneNumber: string;

  @Column()
  gender: UserGenders;

  @Column({
    default: 'true',
  })
  isActivatedUser: isActivatedUser;

  // 인증 정보를 담는 credential 과의 relation
  @OneToOne((type) => Credential, (credential) => credential.user)
  @JoinColumn()
  credential: Credential;

  // 회원의 주소를 담는 address 와의 relation
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  // 회원의 접수한 주문들을 담은 task 와의 relation
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
