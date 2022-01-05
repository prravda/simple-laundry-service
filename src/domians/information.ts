import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreateInformationDto {
  addressLineOne: string;
  addressLineTwo: string;
  location: string;
}

@Entity()
export class Information {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addresLineOne: string;

  @Column()
  addresLineTwo: string;

  @Column()
  location: string;
}
