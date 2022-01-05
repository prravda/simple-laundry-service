import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserGenders } from '../../components/user/types/user-genders';
import { isActivatedUser } from '../../components/user/types/is-activated.user';
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

  @Column()
  isActivatedUser: isActivatedUser;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
