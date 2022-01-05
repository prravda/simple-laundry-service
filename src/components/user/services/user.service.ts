import cuid from 'cuid';
import { Repository } from 'typeorm';
import { AbstractUserService } from '../abstracts/abstract.user.service';
import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { AbstractUserRepository } from '../abstracts/abstract.user.repository';

export class UserService extends AbstractUserService {
  constructor(private readonly userRepository: AbstractUserRepository) {
    super();
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
        throw new Error('존재하지 않는 사용자입니다.');
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
        throw new Error('존재하지 않는 사용자입니다.');
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async saveUser(user: User) {
    return await this.userRepository.saveUser(user);
  }
}
