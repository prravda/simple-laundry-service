import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domians/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';

export abstract class AbstractUserService {
  abstract createUser(createUserDto: CreateUserDto): User;
  abstract findUserByUUID(findUserByUuidDto: FindUserByUuidDto): User | null;
  abstract findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): User | null;
}
