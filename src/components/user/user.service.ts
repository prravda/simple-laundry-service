import { AbstractUserService } from './abstracts/abstract.user.service';
import {
  CreateUserDto,
  CreateUserDtoForController,
  User,
} from '../../domians/user';
import cuid from 'cuid';

export class UserService extends AbstractUserService {
  constructor() {
    super();
  }

  private generateUUID(): string {
    return cuid();
  }

  public insertUser(createUserDto: CreateUserDto): User {
    return new User({
      userUUID: this.generateUUID(),
      ...createUserDtoForController,
      isActivatedUser: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CreateUserDto);
  }
}
