import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { CreateAddressDto } from './address';
import { CreateInformationDto, Information } from './information';
import { Mission } from './mission';
import { CreateTimeDto } from './time';
import { CreateItemWithCreateImageListAndTagList } from './item';

export interface CreateAndSaveTaskDto {
  createInformationDto: CreateInformationDto;
  createAddressDto: CreateAddressDto;
  createTimeDto: CreateTimeDto;
  createItemListWithImageListAndTagListDto: CreateItemWithCreateImageListAndTagList[];
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
