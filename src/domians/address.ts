import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreateAddressDto {
  addressLineOne: string;
  addressLineTwo: string;
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressLineOne: string;

  @Column()
  addressLineTwo: string;
}
