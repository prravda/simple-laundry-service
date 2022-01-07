import { AbstractUserRepository } from '../abstracts/abstract.user.repository';
import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { DeepPartial, FindOneOptions, UpdateResult } from 'typeorm';
import { DeleteUserByUuidDto } from '../dto/delete-user-by-uuid.dto';

export class MockUserRepository extends AbstractUserRepository {
  public createUser(createUserDto: CreateUserDto & { uuid: string }): User {
    const { uuid, name, gender, nickname, cellPhoneNumber } = createUserDto;
    const mockUser = new User();
    mockUser.uuid = uuid;
    mockUser.name = name;
    mockUser.nickname = nickname;
    mockUser.cellPhoneNumber = cellPhoneNumber;
    mockUser.gender = gender;
    return mockUser;
  }

  public findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): Promise<User> {
    const { cellPhoneNumber } = findUserByCellPhoneNumberDto;
    const mockUser = new User();
    mockUser.cellPhoneNumber = cellPhoneNumber;
    return new Promise<User>((res, rej) => {
      res(mockUser);
    });
  }

  public findUserByUUID(findUserByUuidDto: FindUserByUuidDto): Promise<User> {
    const { uuid } = findUserByUuidDto;
    const mockUser = new User();
    mockUser.uuid = uuid;
    return new Promise<User>((res, rej) => {
      res(mockUser);
    });
  }

  public saveUser(user: DeepPartial<User>): Promise<User> {
    const mockUser = new User();
    mockUser.name = user.name!;
    mockUser.nickname = user.nickname!;
    mockUser.cellPhoneNumber = user.cellPhoneNumber!;
    mockUser.gender = user.gender!;
    return new Promise<User>((res, rej) => {
      res(mockUser);
    });
  }

  softDeleteUser(
    deleteUserByUuidDto: DeleteUserByUuidDto,
  ): Promise<UpdateResult> {
    const mockUpdateResult = new UpdateResult();
    return new Promise<UpdateResult>((res, rej) => {
      res(mockUpdateResult);
    });
  }

  // TODO: implement the mock method for testing
  findUserByUUIDWithCondition(
    findUserByUuidDto: FindUserByUuidDto,
    option: FindOneOptions<User>,
  ): Promise<User> {
    return Promise.resolve(new User());
  }
}
