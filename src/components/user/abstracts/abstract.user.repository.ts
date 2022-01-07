import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import {
  AbstractRepository,
  DeepPartial,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { DeleteUserByUuidDto } from '../dto/delete-user-by-uuid.dto';

export abstract class AbstractUserRepository extends AbstractRepository<User> {
  public abstract createUser(
    createUserDto: CreateUserDto & { uuid: string },
  ): User;
  public abstract findUserByUUID(
    findUserByUuidDto: FindUserByUuidDto,
  ): Promise<User>;
  public abstract findUserByUUIDWithCondition(
    findUserByUuidDto: FindUserByUuidDto,
    option: FindOneOptions<User>,
  ): Promise<User>;
  public abstract findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): Promise<User>;
  public abstract softDeleteUser(
    deleteUserByUuidDto: DeleteUserByUuidDto,
  ): Promise<UpdateResult>;
  public abstract saveUser(user: DeepPartial<User>): Promise<User>;
}
