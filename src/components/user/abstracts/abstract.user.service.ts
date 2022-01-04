import { CreateUserDtoForController, User } from '../../../domians/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { AbstractService } from '../../../constants/abstracts/abstract.service';

export abstract class AbstractUserService extends AbstractService {
  abstract insertUser(
    createUserDtoForController: CreateUserDtoForController,
  ): User;
  // abstract findUserByUUID(findUserByUuidDto: FindUserByUuidDto): User | null;
  // abstract findUserByCellPhoneNumber(
  //   findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  // ): User | null;
}
