import { AbstractUserService } from '../abstracts/abstract.user.service';
import { CreateUserDto, User } from '../../domians/user';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';

export class CommonUserService extends AbstractUserService {
  constructor() {
    super();
  }

  createUser(createUserDto: CreateUserDto): User {
    //TODO: implement business logic that return User
  }

  findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): User | null {
    //TODO: implement business logic that return User or null
  }

  findUserByUUID(findUserByUuidDto: FindUserByUuidDto): User | null {
    //TODO: implement business logic that return User or null
  }
}
