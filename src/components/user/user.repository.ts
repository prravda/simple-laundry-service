import { AbstractUserRepository } from './abstracts/abstract.user.repository';
import { Database } from 'better-sqlite3';
import { DatabaseObject } from '../../libs/database-object';
import { FindUserByCellPhoneNumberDto } from './dto/find-user-by-cell-phone-number.dto';
import { CreateUserDto, User } from '../../domians/user';

export class UserRepository extends AbstractUserRepository {
  private connection;
  constructor() {
    super();
    this.connection = DatabaseObject.getDatabase();
  }

  public insertUser(createUserDto: CreateUserDto): User {}

  public findUserByCellPhoneNumber(
    findUserByCellPhoneNumberDto: FindUserByCellPhoneNumberDto,
  ) {
    const { cellPhoneNumber } = findUserByCellPhoneNumberDto;
    const select = this.connection.prepare(
      'SELECT * FROM users WHERE cell_phone_number = ?',
    );
    const result = select.get(cellPhoneNumber) as User;
    return result;
  }

  findUserByUUID(): User {
    return undefined;
  }

  softDeleteUser(): void {}
}
