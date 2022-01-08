import cuid from 'cuid';
import { AbstractUserService } from '../abstracts/abstract.user.service';
import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { AbstractUserRepository } from '../abstracts/abstract.user.repository';
import { FindOneOptions } from 'typeorm';
import { CanNotFindUserWithThisUuidError } from '../errors/can-not-find-user-with-this-uuid-error';
import { CanNotFindUserWithThisCellPhoneNumberError } from '../errors/can-not-find-user-with-this-cell-phone-number-error';

export class UserService extends AbstractUserService {
  constructor(private readonly userRepository: AbstractUserRepository) {
    super();
  }

  public async findUserByUUIDWithConditions(
    findUserByUuidDto: FindUserByUuidDto,
    option: FindOneOptions<User>,
  ): Promise<User> {
    try {
      return await this.userRepository.findUserByUUIDWithCondition(
        findUserByUuidDto,
        option,
      );
    } catch (e) {
      throw new CanNotFindUserWithThisUuidError({
        name: 'CanNotFindUserWithThisUuidError',
        message: `Can't find user with this UUID`,
        statusCode: 404,
        action: `You try to find a user with an invalid uuid`,
        solution: `Check your uuid again`,
      });
    }
  }

  private generateUUID(): string {
    return cuid();
  }

  public createUser(createUserDto: CreateUserDto): User {
    return this.userRepository.createUser({
      uuid: this.generateUUID(),
      ...createUserDto,
    });
  }

  public async findUserByUUID(
    findUserByUuidDto: FindUserByUuidDto,
  ): Promise<User> {
    try {
      const { uuid } = findUserByUuidDto;
      const result = await this.userRepository.findUserByUUID({ uuid });
      if (result === undefined) {
        throw new CanNotFindUserWithThisUuidError({
          name: 'CanNotFindUserWithThisUuidError',
          message: `Can't find user with this UUID`,
          statusCode: 404,
          action: `You try to find a user with an invalid uuid`,
          solution: `Check your uuid again`,
        });
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): Promise<User> {
    try {
      const { cellPhoneNumber } = findUserByCellPhoneNumberDto;
      const result = await this.userRepository.findUserByCellPhoneNumber({
        cellPhoneNumber,
      });
      if (result === undefined) {
        throw new CanNotFindUserWithThisCellPhoneNumberError({
          name: 'CanNotFindUserWithThisCellPhoneNumberError',
          message: `Can't find user with this cell phone number`,
          statusCode: 404,
          action: `You try to find a user with an invalid cell phone number`,
          solution: `Check the cell phone number again`,
        });
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async saveUser(user: User) {
    try {
      return await this.userRepository.saveUser(user);
    } catch (e) {
      throw e;
    }
  }
}
