import { UserGenders } from '../components/user/types/user-genders';
import { isActivatedUser } from '../components/user/types/is-activated.user';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrueOrFalseStringType } from '../constants/true-or-false-string.type';
@Entity()
export class User {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: stirng;

  @Column()
  nickname: stirng;

  @Column()
  cellPhoneNumber: stirng;

  @Column()
  gender: UserGenders;

  @Column()
  isActivatedUser: TrueOrFalseStringType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
