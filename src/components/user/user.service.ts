import { AbstractUserService } from './abstracts/abstract.user.service';
import {
  CreateUserDto,
  CreateUserDtoForController,
  User,
} from '../../domians/user';
import cuid from 'cuid';
import { isActivatedUser } from './types/is-activated.user';
import { DeleteUserByUuidDto } from './dto/delete-user-by-uuid.dto';

export class UserService extends AbstractUserService {
  constructor() {
    super();
  }

  private static generateUUID(): string {
    return cuid();
  }

  public insertUser(
    createUserDtoForController: CreateUserDtoForController,
  ): User {
    return new User({
      userUUID: this.generateUUID(),
      ...createUserDtoForController,
      isActivatedUser: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
