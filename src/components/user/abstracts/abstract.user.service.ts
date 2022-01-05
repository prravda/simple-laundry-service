import {
  CreateUserDto,
  CreateUserDtoForController,
  User,
} from '../../../database/entities/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { AbstractService } from '../../../constants/abstracts/abstract.service';

class createUserDto {}

export abstract class AbstractUserService extends AbstractService {
  abstract insertUser(createUserDto: CreateUserDto): User;
  // abstract findUserByUUID(findUserByUuidDto: FindUserByUuidDto): User | null;
  // abstract findUserByCellPhoneNumber(
  //   findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  // ): User | null;
}
