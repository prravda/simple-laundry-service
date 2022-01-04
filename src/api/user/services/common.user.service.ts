import { AbstractUserService } from '../abstracts/abstract.user.service';
import { CreateUserDto, User } from '../../../domians/user';
import { FindUserByCellPhoneNumberDto } from '../dto/find-user-by-cell-phone-number.dto';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { NewDatabase } from '../../../libs/new-database';

export class CommonUserService extends AbstractUserService {
  private connection: any;
  constructor() {
    super();
    this.connection = NewDatabase.getDatabase();
  }

  insertUser(createUserDto: CreateUserDto): User {
    const user = new User(createUserDto);
  }

  findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ): User | null {
    //TODO: implement business logic that return User or null
  }
  d;
  findUserByUUID(findUserByUuidDto: FindUserByUuidDto): User | null {
    //TODO: implement business logic that return User or null
  }
}
