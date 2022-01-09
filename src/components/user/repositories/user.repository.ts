import { AbstractUserRepository } from '../abstracts/abstract.user.repository';
import {
  FindConditions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { WashswatConnectionManager } from '../../../database/washswat-connection-manager';
import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { DeleteUserByUuidDto } from '../dto/delete-user-by-uuid.dto';

export class UserRepository extends AbstractUserRepository {
  constructor() {
    super();
  }

  private getRepository(): Repository<User> {
    return WashswatConnectionManager.getConnection().getRepository(User);
  }

  public createUser(createUserDto: CreateUserDto): User {
    try {
      return this.getRepository().create(createUserDto);
    } catch (e) {
      throw e;
    }
  }

  public async findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): Promise<User> {
    try {
      const { cellPhoneNumber } = findUserByCellPhoneNumberDto;
      const result = await this.getRepository().findOne({
        where: { cellPhoneNumber },
      });
      if (!result) {
        throw new Error(
          `cannot find user with this cellphone number ${cellPhoneNumber}`,
        );
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  async findUserByUUIDWithCondition(
    findUserByUuidDto: FindUserByUuidDto,
    option: FindOneOptions<User>,
  ): Promise<User> {
    const { uuid } = findUserByUuidDto;
    try {
      const result = await this.getRepository().findOne(
        { uuid },
        { ...option },
      );
      if (!result) {
        throw new Error('not found');
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async findUserByUUID(
    findUserByUuidDto: FindUserByUuidDto,
    option?: FindConditions<User>,
  ): Promise<User> {
    try {
      const { uuid } = findUserByUuidDto;
      const result = await this.getRepository().findOne({ uuid });
      if (!result) {
        throw new Error(`cannot find user with this uuid ${uuid}`);
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async saveUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userEntity = this.createUser(createUserDto);
      return await this.getRepository().save(userEntity);
    } catch (e) {
      throw e;
    }
  }

  public async softDeleteUser(
    deleteUserByUuidDto: DeleteUserByUuidDto,
  ): Promise<UpdateResult> {
    try {
      const { uuid } = deleteUserByUuidDto;
      return this.getRepository().update(
        { uuid },
        { isActivatedUser: 'false', deletedAt: new Date() },
      );
    } catch (e) {
      throw e;
    }
  }
}
