import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';

export abstract class AbstractFacadeUserService extends AbstractService {
  abstract insertUser(createUserDto: CreateUserDto): Promise<string>;
  abstract findUserByUUID(findUserByUuidDto: FindUserByUuidDto): Promise<User>;
}
