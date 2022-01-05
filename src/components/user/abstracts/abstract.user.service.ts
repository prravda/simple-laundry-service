import { CreateUserDto, User } from '../../../database/entities/user';
import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';

export abstract class AbstractUserService extends AbstractService {
  abstract createUser(createUserDto: CreateUserDto): User;

  abstract findUserByUUID(findUserByUuidDto: FindUserByUuidDto): Promise<User>;

  abstract findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): Promise<User>;

  abstract saveUser(user: User): Promise<User>;
}
