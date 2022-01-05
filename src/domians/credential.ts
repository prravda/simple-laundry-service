import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface CreateCredentialDto {
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
